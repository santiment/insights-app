<script>
  import { onMount } from 'svelte'
  import { goto, stores } from '@sapper/app'
  import { get } from 'svelte/store'
  import Dialog from '@/ui/dialog/index'
  import Checkbox from '@/components/Checkbox'
  import {
    ALL_USER_WATCHLISTS_WITH_ITEMS,
    UPDATE_WATCHLIST,
  } from '@/gql/watchlists'
  import { client } from '@/apollo'
  import {
    addProjectToWatchlist,
    removeProjectFromWatchlist,
  } from '@/utils/watchlists'

  export let open
  export let projectId
  let loading = false
  let watchlists = []
  let selected = new Set()
  let hasNotUpdated = true
  let initialHash
  let initialSelectedWatchlists

  const { session } = stores()

  $: if (open) {
    client
      .query({
        query: ALL_USER_WATCHLISTS_WITH_ITEMS,
      })
      .then(({ data }) => {
        const sel = new Set(
          data.watchlists.filter(({ listItems }) =>
            listItems.some(({ project }) => projectId === project.id),
          ),
        )

        if (initialHash === undefined) {
          initialSelectedWatchlists = sel
          initialHash = getSelectedWatchlistHash([...sel])
        }

        selected = sel
        watchlists = data.watchlists
      })
  }

  $: hasNotUpdated = initialHash === getSelectedWatchlistHash([...selected])

  function getSelectedWatchlistHash(watchlists) {
    return watchlists
      .sort(({ id: a }, { id: b }) => a - b)
      .reduce((acc, { id }) => acc + id, '')
  }

  function closeDialog() {
    open = false
  }

  function addToWatchlist() {
    if (!get(session).currentUser) {
      return goto('/experience')
    }
  }

  function toggleWatchlist(watchlist) {
    if (selected.has(watchlist)) {
      selected.delete(watchlist)
    } else {
      selected.add(watchlist)
    }
    selected = new Set(selected)
  }

  function applyChanges() {
    loading = true

    const deletionTargets = []
    const additionSet = new Set(selected)

    initialSelectedWatchlists.forEach(watchlist =>
      additionSet.has(watchlist)
        ? additionSet.delete(watchlist)
        : deletionTargets.push(watchlist),
    )

    const additionTargets = [...additionSet]

    console.log({ deletionTargets, additionTargets })
    const project = +projectId
    initialHash = getSelectedWatchlistHash([...selected])
    initialSelectedWatchlists = selected

    return Promise.all(
      additionTargets
        .map(watchlist => {
          addProjectToWatchlist(project, watchlist)
          // TODO: Correctly update watchlist cache [@vanguard | Nov 11, 2019]
          watchlist.listItems.push({ project: { id: projectId } })
        })
        .concat(
          deletionTargets.map(watchlist => {
            removeProjectFromWatchlist(project, watchlist)
            watchlist.listItems = watchlist.listItems.filter(
              ({ project: { id } }) => id !== projectId,
            )
          }),
        ),
    ).then(() => {
      loading = false
      open = false
    })
  }
</script>

<template lang="pug">
include /ui/mixins

Dialog(bind:open, title='Add to watchlist')
  +button()(slot='trigger', fluid, border, on:click='{addToWatchlist}')
    +icon('add-watchlist').icon_add-watchlist
    |Add to watchlist
  +dialogScrollContent(slot='content')
    .items
      +each('watchlists as watchlist (watchlist.id)')
        +button.item(fluid, on:click!='{()=>toggleWatchlist(watchlist)}')
          span.item__left
            Checkbox(active='{selected.has(watchlist)}')
            |{watchlist.name}
          +icon('{watchlist.isPublic ? "eye-small" : "lock-small"}').icon_is-public
        +else
          .loading.process
  +dialogActions(slot='content')
    +button()(border, on:click='{closeDialog}') Cancel
    +button.apply(variant='fill', accent='jungle-green',
class:disabled!='{initialHash === undefined || hasNotUpdated}',
class:loading, on:click='{applyChanges}') Apply

</template>

<style lang="scss">
  @import '@/mixins';

  .items {
    min-width: 270px;
    display: flex;
    flex-direction: column;
  }

  .item {
    justify-content: space-between;

    &__left {
      display: flex;
      align-items: center;
    }
  }

  .icon_is-public {
    @include size(15px, 14px);
    fill: var(--casper);
  }

  .process {
    height: 30px;
  }

  .icon_add-watchlist {
    fill: var(--casper);
    @include size(16px, 14px);
    margin-right: 20px;
  }
</style>

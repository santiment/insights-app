<script>
  import { onMount } from 'svelte'
  import { goto, stores } from '@sapper/app'
  import { get } from 'svelte/store'
  import Dialog from '@/ui/dialog/index'
  import Checkbox from '@/components/Checkbox'
  import NewWatchlistDialog from '@/components/Nav/NewWatchlistDialog'
  import {
    ALL_USER_WATCHLISTS_WITH_ITEMS,
    UPDATE_WATCHLIST,
  } from '@/gql/watchlists'
  import { client } from '@/apollo'
  import {
    addProjectToWatchlist,
    removeProjectFromWatchlist,
  } from '@/utils/watchlists'
  import { notifications } from '@/stores/notifications'

  export let open
  export let projectId
  let loading = false
  let watchlists = []
  let selected = new Set()
  let hasNotUpdated = true
  let initialHash
  let initialSelectedWatchlists

  const { session } = stores()

  $: hasNotUpdated = initialHash === getSelectedWatchlistHash([...selected])

  function getWatchlists() {
    return watchlists.length
      ? Promise.resolve()
      : client
          .query({
            query: ALL_USER_WATCHLISTS_WITH_ITEMS,
          })
          .then(({ data }) => {
            const userWatchlists = data.watchlists.filter(
              ({ isScreener }) => !isScreener,
            )

            const sel = new Set(
              userWatchlists.filter(({ listItems }) =>
                listItems.some(({ project }) => projectId === project.id),
              ),
            )

            initialSelectedWatchlists = new Set(sel)
            initialHash = getSelectedWatchlistHash([...sel])
            selected = sel
            watchlists = userWatchlists
          })
  }

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
    open = true
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

    const project = +projectId
    const deletionTargets = []
    const additionSet = new Set(selected)

    initialSelectedWatchlists.forEach((watchlist) =>
      additionSet.has(watchlist)
        ? additionSet.delete(watchlist)
        : deletionTargets.push(watchlist),
    )

    const additionTargets = [...additionSet]

    initialHash = getSelectedWatchlistHash([...selected])
    initialSelectedWatchlists = new Set(selected)

    // TODO: Correctly update watchlist cache [@vanguard | Nov 11, 2019]
    watchlists.forEach((watchlist) => {
      const { listItems = [] } = watchlist
      watchlist.listItems = listItems
    })

    return Promise.all(
      additionTargets
        .map((watchlist) => addProjectToWatchlist(project, watchlist))
        .concat(
          deletionTargets.map((watchlist) =>
            removeProjectFromWatchlist(project, watchlist),
          ),
        ),
    ).then(() => {
      loading = false
      open = false

      const updatesAmount = additionTargets.length + deletionTargets.length

      notifications.add({
        type: 'success',
        title: `${updatesAmount} watchlist${
          updatesAmount > 1 ? 's were' : ' was'
        } modified`,
      })
    })
  }
</script>

<template lang="pug">
include /ui/mixins

+button()(fluid, border, on:click='{addToWatchlist}')
  +icon('add-watchlist').icon_add-watchlist
  |Add to watchlist

Dialog(bind:open, title='Add to watchlist')
  svelte:fragment(slot='content')
    +dialogScrollContent()
      .items
        +await('getWatchlists()')
          .loading.process
          +then('_')
            +each('watchlists as watchlist (watchlist.id)')
              +button.item(fluid, on:click!='{()=>toggleWatchlist(watchlist)}')
                span.item__left
                  Checkbox.AddToWatchlistDialog__checkbox(active='{selected.has(watchlist)}')
                  |{watchlist.name}
                +icon('{watchlist.isPublic ? "eye-small" : "lock-small"}').icon_is-public
              +else()
                |You don't have any watchlists

      NewWatchlistDialog(bind:watchlists)
    +dialogActions()
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
    margin-bottom: 15px;
  }

  .item {
    justify-content: space-between;
    padding: 6px 0;

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

  :global(.AddToWatchlistDialog__checkbox) {
    margin-right: 10px;
  }
</style>

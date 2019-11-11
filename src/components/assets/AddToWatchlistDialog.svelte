<script>
  import { onMount } from 'svelte'
  import { goto, stores } from '@sapper/app'
  import { get } from 'svelte/store'
  import Dialog from '@/ui/dialog/index'
  import Checkbox from '@/components/Checkbox'
  import {
    ALL_USER_WATCHLISTS_WITH_ITEMS,
    CREATE_USER_WATCHLIST,
  } from '@/gql/watchlists'
  import { client } from '@/apollo'

  export let open
  export let slug
  let loading = false
  let watchlists = []
  let selected = new Set()
  let hasNotUpdated = true
  let defaultHash

  const { session } = stores()

  $: if (open) {
    client
      .query({
        query: ALL_USER_WATCHLISTS_WITH_ITEMS,
      })
      .then(({ data }) => {
        const sel = new Set(
          data.watchlists.filter(({ listItems }) =>
            listItems.some(({ project }) => slug === project.slug),
          ),
        )

        if (defaultHash === undefined) {
          defaultHash = getSelectedWatchlistHash([...sel])
        }

        selected = sel
        watchlists = data.watchlists
      })
  }

  $: hasNotUpdated = defaultHash === getSelectedWatchlistHash([...selected])

  function getSelectedWatchlistHash(watchlists) {
    return watchlists
      .sort(({ id: a }, { id: b }) => a - b)
      .reduce((acc, { name }) => acc + name, '')
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
    +button()(type='button', border, on:click='{closeDialog}') Cancel
    +button.apply(type='submit', variant='fill', accent='jungle-green',
class:disabled!='{defaultHash === undefined || hasNotUpdated}', class:loading) Apply

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

<script>
  import { onMount } from 'svelte'
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import { ALL_USER_WATCHLISTS } from '@/gql/watchlists'

  let watchlists = []

  const { session } = stores()

  function getWatchlistLink({ id, name }) {
    return `https://app.santiment.net/assets/list?name=${encodeURIComponent(
      name,
    )}@${id}`
  }

  onMount(() => {
    if ($session.currentUser) {
      client
        .query({
          query: ALL_USER_WATCHLISTS,
        })
        .then(({ data }) => (watchlists = data.watchlists))
    }
  })
</script>

<template lang="pug">
include /ui/mixins

+if('$session.currentUser')
  h4.title My Watatchlists
  .watchlists
    .watchlists__scroll
      +each('watchlists as watchlist')
        +button.watchlist(href='{getWatchlistLink(watchlist)}', variant='ghost', fluid) {watchlist.name}
            +icon('{watchlist.isPublic ? "eye-small" : "lock-small"}').watchlist__icon

  +button.new(border, fluid)
    +icon('plus-round').new__icon
    |New Watchlist
  +else()
    .anon
      h3.expl Easy assets tracking
      p.text.text_desc Use watchlists to organize and track assets you are interested in
      h5.text Please, log in to use this feature
      +button.btn(href="/login", accent="jungle-green", variant="fill", fluid) Login
</template>

<style lang="scss">
  @import '@/mixins';

  .anon {
    flex: 1;
    padding: 21px 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }

  .expl {
    margin: 8px 0 4px;
    font-size: 16px;
    line-height: 24px;
  }

  .text {
    color: var(--waterloo);
    text-align: center;

    &_desc {
      margin: 5px 0 25px;
    }
  }

  .btn {
    justify-content: center;
  }

  .watchlists {
    flex: 1;
    margin: 0 -8px;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;

    &__scroll {
      padding: 0 8px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
    }
  }

  .watchlist {
    justify-content: space-between;

    &__icon {
      @include size(15px, 14px);
      fill: var(--casper);
      &:hover {
        fill: var(--mirage);
      }
    }
  }

  .new {
    justify-content: center;

    &__icon {
      @include size(16px);
      fill: var(--casper);
      margin: 0 8px 0 0;
    }
  }
</style>

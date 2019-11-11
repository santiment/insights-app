<script>
  import Dialog from '@/ui/dialog/index'
  import NewWatchlistForm from './NewWatchlistForm.svelte'

  export let watchlists
  let open = false
</script>

<template lang="pug">
include /ui/mixins

Dialog(bind:open, title='New watchlist')
  +button.new(slot='trigger', border, fluid)
    +icon('plus-round').new__icon
    |New Watchlist
  div(slot='content')
    NewWatchlistForm(bind:watchlists, bind:open)

</template>

<style lang="scss">
  @import '@/mixins';

  .new {
    justify-content: center;

    &__icon {
      @include size(16px);
      fill: var(--casper);
      margin: 0 8px 0 0;
    }
  }
</style>

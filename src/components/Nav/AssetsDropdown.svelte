<script>
  import Watchlists from './AssetsDropdownWatchlists.svelte'
</script>

<template lang="pug">
include /ui/mixins

-
  var app = 'https://app.santiment.net/assets/'
  function list(name){
    return app + 'list?name=' + encodeURIComponent(name) + '#shared'
  }

.wrapper
  .categories
    h4.title Categories
    +button.item(variant='ghost', fluid, href=app+'all') All Assets
    +button.item(variant='ghost', fluid, href=app+'erc20') ERC20
    +button.item(variant='ghost', fluid, href=list('top 50 erc20')) Top 50 ERC20
    +button.item(variant='ghost', fluid, href=list('stablecoins')) Stablecoins
    +button.item(variant='ghost', fluid, href=list('centralized exchanges')) Centralized Exchanges
    +button.item(variant='ghost', fluid, href=list('decentralized exchanges')) Decentralized Exchanges
    +button.item(variant='ghost', fluid, href=list('trending assets')) Emerging Trending Assets
  .categories.categories_watchlist
    Watchlists 
</template>

<style lang="scss">
  @import '@/mixins';

  .wrapper {
    display: flex;
  }

  .categories {
    padding: 8px;
    width: 280px;

    &_watchlist {
      border-left: 1px solid var(--porcelain);
      display: flex;
      flex-direction: column;
    }
  }

  .title {
    line-height: 18px;
    font-size: 12px;
    color: var(--waterloo);
    margin: 3px 11px 8px;
    font-weight: 500;
  }

  .item {
    white-space: nowrap;
    width: 100%;
  }
</style>

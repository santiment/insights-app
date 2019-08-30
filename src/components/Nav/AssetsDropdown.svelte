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
    h4.title My Watatchlists
    .anon
      h3.expl Easy assets tracking
      p.text.text_desc Use watchlists to organize and track assets you are interested in
      h5.text Please, log in to use this feature
      +button.btn(href="/login", accent="jungle-green", variant="fill", fluid) Login
</template>

<style lang="scss">
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
</style>

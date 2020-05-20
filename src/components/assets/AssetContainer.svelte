<script>
  export let classes = { body: '' }
  export let asset

  let { name, slug, ticker, logoUrl } = asset
</script>

<template lang="pug">
include /ui/mixins

+panel.card(variant='box')
  a.head(href='https://app.santiment.net/projects/{slug}')
    img(src='{logoUrl}', alt='{name} logo')
    h3 {name}
      span {ticker}
  .body(class='{classes.body}')
    slot

</template>

<style lang="scss">
  @import '@/mixins';

  .card {
    width: 215px;
    margin-bottom: 16px;
    font-size: 12px;

    @media screen and (min-width: 1280px) {
      width: 235px;
      font-size: 14px;
    }
  }

  .head {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--porcelain);
    padding: 16px;
  }

  img {
    height: 22px;
    width: 22px;
    margin-right: 8px;
  }

  h3 {
    @media screen and (min-width: 1280px) {
      @include text('body-2');
    }
  }

  span {
    color: var(--waterloo);
    text-transform: uppercase;
    margin-left: 4px;
    font-size: 10px;

    @media screen and (min-width: 1280px) {
      @include text('caption');
    }
  }

  .body {
    padding: 16px;
  }
</style>

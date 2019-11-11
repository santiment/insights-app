<script>
  import ValueChange, { percentChange } from '@/components/ValueChange'
  import ChangeChart from './ChangeChart.svelte'
  import AddToWatchlistDialog from './AddToWatchlistDialog.svelte'

  export let asset
  let open = false

  let { id, name, slug, ticker, logoUrl, historyPrice } = asset

  const { length } = historyPrice
  const { priceUsd: currentPrice } = historyPrice[length - 1]
  const { priceUsd: firstPrice } = historyPrice[0]
  const change = (100 * (currentPrice - firstPrice)) / firstPrice
</script>

<template lang="pug">
include /ui/mixins

+panel.card(variant='box')
  a.head(href='https://app.santiment.net/projects/{slug}')
    img(src='{logoUrl}', alt='{name} logo')
    h3 {name}
      span {ticker}
  .body
    .body__top
      h4 $ {currentPrice.toFixed(2)}
      .chart
        ChangeChart({change}, data='{historyPrice}')
    .body__bottom
      ValueChange.FeaturedAssets__change({change}, formatter='{percentChange}')
      |in last 7d
    AddToWatchlistDialog(projectId='{id}', bind:open)

</template>

<style lang="scss">
  @import '@/mixins';

  .card {
    width: 235px;
    margin-bottom: 16px;
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
    @include text('body-2');
  }

  span {
    color: var(--waterloo);
    text-transform: uppercase;
    @include text('caption');
    margin-left: 4px;
  }

  .chart {
    width: 64px;
    height: 29px;
  }

  .body {
    padding: 16px;

    &__top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    &__bottom {
      color: var(--casper);
      margin-bottom: 13px;
    }
  }

  h4 {
    @include text('h4');
  }

  :global(.FeaturedAssets__change) {
    margin-right: 5px;
  }
</style>

<script>
  import ValueChange, { percentChange } from '@/components/ValueChange'
  import ChangeChart from './ChangeChart.svelte'
  import AddToWatchlistDialog from './AddToWatchlistDialog.svelte'
  import AssetContainer from './AssetContainer.svelte'

  export let asset
  let open = false

  let {
    id,
    name,
    slug,
    ticker,
    logoUrl,
    percentChange7d,
    historyPrice,
    priceUsd,
  } = asset

  const price = priceUsd.toFixed(priceUsd < 1 ? 6 : 2)
</script>

<template lang="pug">
include /ui/mixins

AssetContainer({asset})
  .body__top
    h4 $ {price}
    .chart
    ChangeChart(change='{percentChange7d}', data='{historyPrice}')
  .body__bottom
    ValueChange.FeaturedAssets__change(change='{percentChange7d}', formatter='{percentChange}')
    |in last 7d
  AddToWatchlistDialog(projectId='{id}', bind:open)

</template>

<style lang="scss">
  @import '@/mixins';
  .chart {
    width: 64px;
    height: 29px;
  }

  .body {
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
    font-size: 20px;
    @media screen and (min-width: 1280px) {
      @include text('h4');
    }
  }

  :global(.FeaturedAssets__change) {
    margin: 0 5px 0 8px;
  }
</style>

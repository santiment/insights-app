<script>
  import { onMount } from 'svelte'
  import Asset from './Asset.svelte'
  import AssetContainer from './AssetContainer.svelte'
  import PriceSincePublication from '@/components/insights/PriceSincePublication.svelte'
  import {
    getPeriodSincePublication,
    getPriceDataSincePublication,
  } from '@/logic/insights'

  export let assets
  export let publishedAt

  let priceAsset
  let priceDataSincePublication

  const classes = {
    body: 'FeaturedAssets__container-body',
  }

  onMount(() => {
    if (!assets) return

    priceAsset = assets[0]

    const { from, to } = getPeriodSincePublication(publishedAt)
    const isoFrom = from.toISOString()
    const isoTo = to.toISOString()

    getPriceDataSincePublication(priceAsset.ticker, isoFrom, isoTo)
      .then((historyPrice) => (priceDataSincePublication = historyPrice))
      .catch(console.warn)
  })
</script>

<template lang="pug">
include /ui/mixins

h2 Assets from this insight

+if('priceDataSincePublication')
  AssetContainer(asset='{priceAsset}', {classes})
    PriceSincePublication(publishDate='{publishedAt}', data='{priceDataSincePublication}', chartMinHeight='{46}')

+each('assets as asset (asset.slug)')
  +if('asset.historyPrice.length')
    Asset({asset})

</template>

<style lang="scss">
  @import '@/mixins';

  h2 {
    @include text('body-3');
    color: var(--waterloo);
    margin: 0 0 16px;
  }

  :global(.FeaturedAssets__container-body) {
    text-align: right;
  }
</style>

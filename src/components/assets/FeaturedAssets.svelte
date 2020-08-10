<script>
  import { onMount } from 'svelte'
  import Asset from './Asset.svelte'
  import AssetContainer from './AssetContainer.svelte'
  import PriceSincePublication from '@/components/insights/PriceSincePublication.svelte'
  import { getInsightChartProjectData } from '@/logic/projects'

  export let insightId
  export let assets
  export let publishedAt

  let priceAsset
  let priceHistory
  let chartData

  const classes = {
    body: 'FeaturedAssets__container-body',
  }

  onMount(() => {
    if (!assets) return

    priceAsset = assets[0]

    getInsightChartProjectData(+insightId, priceAsset.ticker, publishedAt)
      .then((data) => (chartData = data))
      .catch(console.warn)
  })
</script>

<template lang="pug">
include /ui/mixins

h2 Assets from this insight

+if('chartData')
  AssetContainer(asset='{priceAsset}', {classes})
    PriceSincePublication({...chartData}, publishDate='{publishedAt}', chartMinHeight='{46}')

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

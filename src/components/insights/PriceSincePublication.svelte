<script>
  import ValueChange, {
    percentChange as formatter,
  } from '@/components/ValueChange'
  import Line from './Line.svelte'
  import { binarySearchByDatetime } from '@/utils/search'

  const calculateChange = (newPrice, oldPrice) =>
    (100 * (newPrice - oldPrice)) / oldPrice

  export let ticker = ''
  export let publicationPrice = 0
  export let currentPrice = 0
  export let chartMinHeight = undefined
  export let publishDate
  export let priceHistory

  let change
  let publishedIndex = 0

  $: if (priceHistory) {
    const { length } = priceHistory
    const { value, index } = binarySearchByDatetime(priceHistory, publishDate)

    if (value) {
      publishedIndex = index
      publicationPrice = publicationPrice || value.priceUsd

      change = calculateChange(
        currentPrice || priceHistory[length - 1].priceUsd,
        publicationPrice,
      )
    }
  }
</script>

<template lang="pug">
include /ui/mixins

h3 {ticker} price since publication
Line({publishedIndex}, {publicationPrice}, {change}, minHeight='{chartMinHeight}', data='{priceHistory}')
ValueChange({formatter}, {change})
</template>

<style>
  h3 {
    color: var(--waterloo);
    text-align: center;
  }

  h3:first-letter {
    text-transform: uppercase;
  }
</style>

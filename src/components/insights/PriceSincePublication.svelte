<script>
  import ValueChange, {
    percentChange as formatter,
  } from '@/components/ValueChange'
  import Line from './Line.svelte'
  import { binarySearchByDatetime } from '@/utils/search'

  export let publishDate
  export let ticker = ''
  export let data
  export let chartMinHeight

  let change
  let publishedIndex = 0
  let publishedPrice = 0

  $: if (data) {
    const { length } = data

    const { value, index } = binarySearchByDatetime(data, publishDate)

    if (value) {
      publishedIndex = index
      publishedPrice = value.priceUsd

      change =
        (100 * (data[length - 1].priceUsd - publishedPrice)) / publishedPrice
    }
  }
</script>

<template lang="pug">
include /ui/mixins

h3 {ticker} price since publication
Line({data}, {publishedIndex}, {publishedPrice}, {change}, minHeight='{chartMinHeight}')
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

<script>
  import { getContext } from 'svelte'
  import InsightCardInternals from '@/components/insights/InsightCardInternals'
  import ViewportObserver from '@/components/ViewportObserver'
  import PriceSincePublication from './PriceSincePublication.svelte'
  import { noTrendTagsFilter } from '@/utils/insights'

  const options = {
    rootMargin: '200px',
  }
  const getInsightChartProjectData = getContext('getInsightChartProjectData')

  let klass = ''
  export { klass as class }
  export let insight, transformLink

  let graph = {}
  let data
  let observeWhile

  const publishDate = insight.publishedAt || insight.updatedAt
  const filteredTags = insight.tags.filter(noTrendTagsFilter)
  const ticker =
    filteredTags.length > 0 ? filteredTags[0].name.toUpperCase() : ''

  $: observeWhile = data ? false : ticker

  function onIntersect() {
    getInsightChartProjectData(+insight.id, ticker, publishDate)
      .then((chartData) => (data = chartData))
      .catch((e) => {
        console.warn(e)
        observeWhile = false
      })
  }
</script>

<template lang="pug">
include /ui/mixins

ViewportObserver(top, {options}, on:intersect='{onIntersect}', {observeWhile})
  +panel.wrapper(class="{klass}", bind:this="{graph}")
    .left
      InsightCardInternals({insight}, {transformLink})
    +if('data')
      .right
        PriceSincePublication({ticker}, {publishDate}, {...data})
</template>

<style>
  .wrapper {
    display: flex;
    min-width: 320px;
  }

  .left {
    flex: 1;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .right {
    width: 260px;
    padding: 21px 20px 29px;
    background: linear-gradient(180deg, var(--athens), hsla(0, 0%, 100%, 0));
    display: flex;
    flex-direction: column;
    text-align: right;
  }
</style>

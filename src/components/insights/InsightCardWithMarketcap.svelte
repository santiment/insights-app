<script>
  import { onMount, onDestroy } from 'svelte'
  import InsightCardInternals from '@/components/insights/InsightCardInternals'
  import ViewportObserver from '@/components/ViewportObserver'
  import ValueChange, {
    percentChange as formatter,
  } from '@/components/ValueChange'
  import Line from './Line.svelte'
  import { HISTORY_PRICE_QUERY } from '@/gql/metrics'
  import { noTrendTagsFilter } from '@/utils/insights'
  import { client } from '@/apollo'
  import { getTimeIntervalFromToday, MONTH } from '@/utils/dates'
  import { binarySearchByDatetime } from '@/utils/search'

  const options = {
    rootMargin: '200px',
  }

  let klass = ''
  export { klass as class }
  export let insight

  let graph = {}
  let data
  let observeWhile
  let publishedIndex = 0,
    publishedPrice = 0

  const publishDate = insight.publishedAt || insight.updatedAt
  const { from, to } = getTimeIntervalFromToday(-2, MONTH, {
    from: new Date(publishDate),
  })

  const isoFrom = from.toISOString()
  const isoTo = to.toISOString()

  const filteredTags = insight.tags.filter(noTrendTagsFilter)
  const ticker = filteredTags.length > 0 ? filteredTags[0].name : ''

  let change
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

  $: observeWhile = data ? false : ticker

  function onIntersect() {
    client
      .query({
        query: HISTORY_PRICE_QUERY,
        variables: {
          from: isoFrom,
          to: isoTo,
          interval: '1d',
          ticker,
        },
      })
      .then(({ data: { historyPrice } }) => {
        if (!historyPrice.length) {
          return Promise.reject(`${ticker} historyPrice has no data`)
        }

        data = historyPrice
      })
      .catch(e => {
        console.warn(e)
        observeWhile = false
      })
  }
</script>

<template lang="pug">
include /ui/mixins

ViewportObserver(top, {options}, on:intersect='{onIntersect}', {observeWhile})
  +panel.wrapper(variant='box', class="{klass}", bind:this="{graph}")
    .left
      InsightCardInternals({insight})
    +if('data')
      .right
        h3.title {ticker} price since publication
        Line({data}, {publishedIndex}, {publishedPrice}, {change})
        ValueChange({formatter}, {change})
</template>

<style>
  .wrapper {
    display: flex;
    min-width: 320px;
    height: 200px;
  }

  .left {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .right {
    width: 260px;
    padding: 20px;
    background: linear-gradient(180deg, var(--athens), hsla(0, 0%, 100%, 0));
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  .title {
    color: var(--waterloo);
    text-align: center;
  }
</style>

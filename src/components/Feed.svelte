<script>
  import { getDateFormats } from '@/utils/dates'

  export let items
  export let dateKey
  const feedDates = new Map()

  let lastDate

  let feed
  $: feed = feedInsights(items)

  function feedInsights(insights) {
    feedDates.clear()
    lastDate = undefined
    return insights.map(item => {
      const { MMM, D } = getDateFormats(new Date(item[dateKey]))
      const feedDate = `${MMM} ${D}`
      if (lastDate !== feedDate) {
        feedDates.set(item, feedDate)
        lastDate = feedDate
      }
      return item
    })
  }
</script>

<template lang="pug">
+each('feed as item (item.id)')
  +if('feedDates.get(item)')
    h4.date {feedDates.get(item)}
  slot(name='item', item='{item}')
</template>

<style>
  .date {
    line-height: 22px;
    font-size: 14px;
    color: var(--waterloo);
    margin: 0 0 16px;
  }
</style>

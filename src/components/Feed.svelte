<script>
  import { getDateFormats } from "@/utils/dates";

  export let items;
  export let dateKey;

  let lastDate;

  let feed;
  $: feed = feedInsights(items);

  function feedInsights(insights) {
    return insights.map(item => {
      const { MMM, D } = getDateFormats(new Date(item[dateKey]));
      const feedDate = `${MMM} ${D}`;
      if (lastDate !== feedDate) {
        item.__feedDate = feedDate;
        lastDate = feedDate;
      }
      return item;
    });
  }
</script>

<template lang="pug">
+each('feed as item (item.id)')
  +if('item.__feedDate')
    h4.date {item.__feedDate}
  slot(name='item', item='{item}')
</template>

<style>
  .date {
    line-height: 22px;
    font-size: 14px;
    color: var(--waterloo);
    margin: 40px 0px 16px;
  }
</style>

<script context="module">
  import { client } from '@/apollo'
  import gql from 'graphql-tag'
  import { ALL_INSIGHTS_BY_TAG_QUERY } from '@/gql/insights'

  export async function preload(page) {
    const { slug: tag } = page.params

    let res
    try {
      res = await client.query({
        query: ALL_INSIGHTS_BY_TAG_QUERY,
        variables: {
          tag,
        },
        fetchPolicy: 'network-only',
      })
    } catch (e) {
      console.error(e)
      return {}
    }

    return { insights: res.data.insights }
  }
</script>

<script>
  import InsightCard from '@/components/insights/InsightCard'
  import Feed from '@/components/Feed'
  import { publishDateSorter } from '@/utils/insights'

  export let insights = []

  $: insights.sort(publishDateSorter)
</script>

<template lang="pug">
svelte:head
  title Santiment Insights by Tag
  meta(property='og:title', content='Santiment Insights by Tag')

.insights
  Feed(items="{insights}", dateKey="createdAt")
    div(slot="item", let:item="{insight}")
      InsightCard.insights__item({insight})

</template>

<style lang="scss">
  .insights {
    display: flex;
    flex-direction: column;

    :global(&__item) {
      margin-bottom: 24px;
      width: 100%;
    }
  }
</style>

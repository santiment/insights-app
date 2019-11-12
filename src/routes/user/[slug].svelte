<script context="module">
  import { client } from '@/apollo'
  import gql from 'graphql-tag'
  import { INSIGHTS_BY_USERID_QUERY } from '@/gql/insights'

  export async function preload(page) {
    const { slug } = page.params

    let res
    try {
      res = await client.query({
        query: INSIGHTS_BY_USERID_QUERY,
        variables: {
          id: parseInt(slug, 10),
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
  import InsightCardDesktop from '@/components/insights/InsightCardWithMarketcap'
  import InsightCardMobile from '@/components/insights/InsightCard'
  import Feed from '@/components/Feed'
  import { getMobileComponent } from '@/utils/responsive'
  import { publishDateSorter } from '@/utils/insights'

  export let insights = []

  const InsightCard = getMobileComponent(InsightCardMobile, InsightCardDesktop)

  $: insights.sort(publishDateSorter)
</script>

<template lang="pug">
svelte:head
  title Santiment User Insights
  meta(property='og:title', content='Santiment User Insights')

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

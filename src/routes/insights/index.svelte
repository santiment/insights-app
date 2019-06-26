<script context="module">
  import { client } from '@/apollo'
  import { getDateFormats } from '@/utils/dates'
  import { ALL_INSIGHTS_BY_PAGE_QUERY } from '@/gql/insights'

  export async function preload() {
    const res = await client.query({
      query: ALL_INSIGHTS_BY_PAGE_QUERY,
      variables: {
        page: 1,
      },
      fetchPolicy: 'network-only',
    })

    return {
      insights: res.data.insights,
    }
  }
</script>

<script>
  import { onMount } from 'svelte'
  import Feed from '@/components/Feed'
  import ViewportObserver from '@/components/ViewportObserver'
  import InsightCardDesktop from '@/components/insights/InsightCardWithMarketcap'
  import InsightCardMobile from '@/components/insights/InsightCard'
  import { getMobileComponent } from '@/utils/responsive'

  const InsightCard = getMobileComponent(InsightCardMobile, InsightCardDesktop)

  export let insights = []
  let page = 1
  let loading = false
  let hasMore = true

  let target
  let offsetHeight

  function getInsights() {
    loading = true
    page = page + 1
    return client
      .query({
        query: ALL_INSIGHTS_BY_PAGE_QUERY,
        variables: {
          page,
        },
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        if (data.insights.length === 0) {
          hasMore = false
        } else {
          insights = insights.concat(data.insights)
        }

        loading = false
      })
  }

  function onIntersect() {
    if (hasMore && !loading) {
      getInsights()
    }
  }

  const options = {
    rootMargin: '650px',
  }
</script>

<template lang="pug">

.insights(bind:this="{target}", bind:offsetHeight)
  ViewportObserver({options}, on:intersect='{onIntersect}', observeWhile='{hasMore}')
    Feed(items="{insights}", dateKey="updatedAt")
      div.insights__item(slot="item", let:item="{insight}")
        InsightCard({insight})

</template>

<style lang="scss">
  .insights {
    display: flex;
    flex-direction: column;

    &__item {
      margin-bottom: 24px;
      width: 100%;
    }
  }
</style>

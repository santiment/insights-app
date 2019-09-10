<script context="module">
  import { client } from '@/apollo'
  import {
    ALL_INSIGHTS_BY_PAGE_QUERY,
    FEATURED_INSIGHTS_QUERY,
  } from '@/gql/insights'
  import { checkGDPR } from '@/logic/gdpr'

  export async function preload(_, session, { apollo = client }) {
    await session.loadingUser
    if (checkGDPR(session.currentUser, this)) {
      return
    }

    const [resAll, resFeat] = await Promise.all([
      apollo.query({
        query: ALL_INSIGHTS_BY_PAGE_QUERY,
        variables: {
          page: 1,
        },
        fetchPolicy: 'network-only',
      }),
      apollo.query({
        query: FEATURED_INSIGHTS_QUERY,
      }),
    ])

    return {
      insights: resAll.data.insights,
      featured: resFeat.data.insights,
    }
  }
</script>

<script>
  import { onMount } from 'svelte'
  import Feed from '@/components/Feed'
  import ViewportObserver from '@/components/ViewportObserver'
  import InsightCardDesktop from '@/components/insights/InsightCardWithMarketcap'
  import InsightCardMobile from '@/components/insights/InsightCard'
  import InsightSmallCard from '@/components/insights/SmallCard'
  import { publishDateSorter } from '@/utils/insights'
  import { getMobileComponent } from '@/utils/responsive'

  const InsightCard = getMobileComponent(InsightCardMobile, InsightCardDesktop)
  const options = {
    rootMargin: '650px',
  }

  export let insights = []
  export let featured = []

  $: insights = [...insights].sort(publishDateSorter)
  $: featured = [...featured].sort(publishDateSorter)

  let page = 1
  let loading = false
  let hasMore = true

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
</script>

<template lang="pug">
include /ui/mixins

svelte:head
  title Insights
  meta(property='og:title', content='Insights')
  meta(property='og:description', content='All Commmunity Insights')

.insights.bot-scroll
  .insights__all
    ViewportObserver({options}, on:intersect='{onIntersect}', observeWhile='{hasMore}')
      Feed(items="{insights}", dateKey="publishedAt")
        div.insights__item(slot="item", let:item="{insight}")
          InsightCard({insight})
  .insights__featured
    h2 Featured insights
    +panel(variant='box').featured
      .featured__scroll
        +each('featured as insight')
          .featured__item
            InsightSmallCard({insight})

</template>

<style lang="scss">
  @import '@/mixins';

  .insights {
    display: flex;

    &__all {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    &__featured {
      width: 370px;
      height: 90vh;
      position: -webkit-sticky;
      position: sticky;
      top: 5vh;
      margin: 30px 0 0 30px;
      display: flex;
      flex-direction: column;
    }

    &__item {
      margin-bottom: 24px;
      width: 100%;
    }
  }

  h2 {
    @include text('h4', 'm');
    margin: 0 0 12px;
  }

  .featured {
    position: relative;
    overflow: hidden;
    flex: 1;

    &:hover {
      overflow-y: auto;
      overflow-y: overlay;
    }

    &__scroll {
      position: absolute;
    }

    &__item {
      padding: 16px 23px;
      border-bottom: 1px solid var(--porcelain);

      &:last-child {
        border: none;
      }
    }
  }
</style>

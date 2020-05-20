<script context="module">
  import { client } from '@/apollo'
  import { FEATURED_INSIGHTS_QUERY } from '@/gql/insights'
  import { getAllInsights } from '@/logic/insights'
  import { checkGDPR } from '@/logic/gdpr'

  export async function preload(_, session, { apollo = client }) {
    await session.loadingUser
    if (checkGDPR(session.currentUser, this)) {
      return
    }

    const [resAll, resFeat] = await Promise.all([
      getAllInsights({ page: 1 }, apollo),
      apollo.query({
        query: FEATURED_INSIGHTS_QUERY,
      }),
    ])

    return {
      insights: resAll,
      featured: resFeat.data.insights,
    }
  }
</script>

<script>
  import { onMount } from 'svelte'
  import { stores } from '@sapper/app'
  import Feed from '@/components/Feed'
  import ViewportObserver from '@/components/ViewportObserver'
  import InsightCardDesktop from '@/components/insights/InsightCardWithMarketcap'
  import InsightCardMobile from '@/components/insights/InsightCard'
  import InsightSmallCard from '@/components/insights/SmallCard'
  import PulseCard from '@/components/insights/PulseCard'
  import { publishDateSorter } from '@/utils/insights'
  import { getMobileComponent } from '@/utils/responsive'

  const { session } = stores()

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
    return getAllInsights({ page }).then((newInsights) => {
      if (newInsights.length === 0) {
        hasMore = false
      } else {
        insights = insights.concat(newInsights)
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
  meta(name='description', content='All Community Insights')
  meta(property='og:description', content='All Commmunity Insights')

.insights.bot-scroll
  .insights__all
    ViewportObserver({options}, on:intersect='{onIntersect}', observeWhile='{hasMore}')
      Feed(items="{insights}", dateKey="publishedAt", preIndex='{4}')
        div.insights__item(slot="item", let:item="{insight}")
          +if('insight.isPulse')
            PulseCard({insight})
            +else()
              InsightCard({insight})
        div(slot='preIndex')
          +if('$session.isMobile')
            .mobile-featured
              h2.mobile-featured__title Handpicked Takes
              .mobile-featured__list
                .mobile-featured__visible
                  .mobile-featured__scroll
                    +each('featured as insight')
                      +panel(variant='box').mobile-featured__item
                        InsightSmallCard({insight})
            
  +if('!$session.isMobile')
    .insights__featured
      h2 Handpicked Takes
      +panel(variant='box').featured
        .featured__scroll
          +each('featured as insight')
            .featured__item
              InsightSmallCard({insight})

</template>

<style lang="scss">
  @import '@/mixins';

  $mob-card-height: 139;

  .mobile-featured {
    display: flex;
    flex-direction: column;
    margin: 0 -16px 24px;

    background-color: var(--athens);
    padding: 16px 0 0;

    &__title {
      margin: 0 16px 12px;
    }

    &__list {
      height: #{$mob-card-height + 16}px;
      overflow: hidden;
    }

    &__visible {
      height: #{$mob-card-height + 20}px;
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }

    &__scroll {
      display: flex;
      position: absolute;
      height: #{$mob-card-height}px;
    }

    &__item {
      margin: 0 8px 0 0;
      padding: 18px 24px;
      width: 270px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &:first-child {
        margin-left: 16px;
      }
    }
  }

  .insights {
    display: flex;

    &__all {
      max-width: 100%;
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
    margin: 0 0 23px;
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

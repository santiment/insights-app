<script context="module">
  import { client } from '@/apollo'
  import { FEATURED_INSIGHTS_SMALL_QUERY } from '@/gql/insights'
  import {
    getAllInsights,
    getPopularAuthors,
    extractURLTags,
  } from '@/logic/insights'
  import { checkGDPR } from '@/logic/gdpr'

  export async function preload(page, session, { apollo = client }) {
    await session.loadingUser
    if (checkGDPR(session.currentUser, this)) {
      return
    }

    const { tags: qTags, onlyPro } = page.query
    const isOnlyPro = onlyPro !== undefined || undefined
    const tags = extractURLTags(qTags)

    const [resAll, resFeat, popularAuthors] = await Promise.all([
      getAllInsights({ page: 1, tags, isOnlyPro }, apollo),
      apollo.query({
        query: FEATURED_INSIGHTS_SMALL_QUERY,
      }),
      session.isMobile ? undefined : getPopularAuthors(),
    ])

    return {
      tags,
      isOnlyPro,
      popularAuthors,
      insights: resAll,
      featured: resFeat.data.insights.sort(publishDateSorter).slice(0, 5),
    }
  }
</script>

<script>
  import { onMount } from 'svelte'
  import { stores } from '@sapper/app'
  import Feed from '@/components/Feed'
  import ProfileInfo from '@/components/ProfileInfo'
  import ViewportObserver from '@/components/ViewportObserver'
  import InsightCardDesktop from '@/components/insights/InsightCardWithMarketcap'
  import InsightCardMobile from '@/components/insights/InsightCard'
  import InsightSmallCard from '@/components/insights/SmallCard'
  import PulseCard from '@/components/insights/PulseCard'
  import { publishDateSorter } from '@/utils/insights'
  import { getMobileComponent } from '@/utils/responsive'

  const { page, session } = stores()

  const InsightCard = getMobileComponent(InsightCardMobile, InsightCardDesktop)
  const options = {
    rootMargin: '650px',
  }

  const PopularAuthorsClasses = {
    wrapper: 'PopularAuthors__wrapper',
    icon: 'PopularAuthors__icon',
    info: 'PopularAuthors__info',
    name: 'PopularAuthors__name',
    status: 'PopularAuthors__status',
  }

  export let isOnlyPro = undefined
  export let tags = undefined
  export let insights = []
  export let featured = []
  export let popularAuthors = undefined

  $: insights = [...insights].sort(publishDateSorter)
  $: reset(tags, isOnlyPro)

  let pageOffset = 1
  let loading = false
  let hasMore = true

  function reset() {
    pageOffset = 1
    loading = false
    hasMore = true
  }

  function loadInsights() {
    loading = true
    pageOffset = pageOffset + 1
    return getAllInsights({ page: pageOffset, tags, isOnlyPro }).then(
      (newInsights) => {
        if (newInsights.length === 0) {
          hasMore = false
        } else {
          insights = insights.concat(newInsights)
        }

        loading = false
      },
    )
  }

  function onIntersect() {
    if (hasMore && !loading) {
      loadInsights()
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
      +if('loading')
        | Loading...
            
  +if('!$session.isMobile')
    .insights__featured
      h2 Handpicked Takes
      .featured
        .featured__scroll
          +each('featured as insight')
            .featured__item
              InsightSmallCard({insight})
      h2.authors Popular Authors
      .featured
        .featured__scroll
          +each('popularAuthors as author')
            ProfileInfo(name="{author.username}", id="{author.id}", avatarUrl="{author.avatarUrl}", status='{author.insightsCount.totalCount} insights', classes='{PopularAuthorsClasses}', withPic)


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
      width: 353px;
      height: calc(100vh - 60px);
      position: -webkit-sticky;
      position: sticky;
      top: 30px;
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
    margin: 0 0 16px;
  }

  .authors {
    margin-top: 28px;
  }

  .featured {
    position: relative;
    overflow: hidden;
    flex: 1;
    border: none;

    &:hover {
      overflow-y: auto;
      overflow-y: overlay;
    }

    &__scroll {
      width: 100%;
      position: absolute;
    }

    &__item {
      padding: 0 0 22px;

      &:last-child {
        border: none;
        padding: 0;
      }
    }
  }

  .featured :global() {
    &.PopularAuthors__wrapper {
      padding: 18px 0;
      border-bottom: 1px solid var(--porcelain);

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
      }
    }

    &.PopularAuthors__icon {
      @include size(45px);
      min-width: 45px;
      margin-right: 16px;
    }

    &.PopularAuthors__info {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &.PopularAuthors__name {
      @include text('body-2');
      height: auto;
    }

    &.PopularAuthors__status {
      @include text('body-3');
      margin: 0;
    }
  }
</style>

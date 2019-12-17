<script>
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import InsightCard from '@/components/insights/InsightCard'
  import InsightSmallCard from '@/components/insights/SmallCard'
  import {
    INSIGHTS_BY_USERID_QUERY,
    FEATURED_INSIGHTS_QUERY,
  } from '@/gql/insights'

  export let id, userId

  const { session } = stores()

  const query = client
    .query({
      query: INSIGHTS_BY_USERID_QUERY,
      variables: {
        id: userId,
      },
    })
    .then(({ data }) =>
      data.insights && data.insights.length < 3
        ? client
            .query({ query: FEATURED_INSIGHTS_QUERY })
            .then(({ data: { insights } }) => data.insights.concat(insights))
        : data.insights,
    )
    .then(insights =>
      insights
        .slice(0, 10)
        .filter(insight => insight.id !== id)
        .map(insight => ({ ...insight, tags: [] })),
    )
    .catch(console.warn)
</script>

<template lang="pug">
include /ui/mixins

+await('query then insights')
  .wrapper
    h2 Suggested insights
    .visible
      .visible__scroll
        .scroll
          +each('insights as insight')
            +if('$session.isMobile')
              +panel(variant='box').mobile-card
                InsightSmallCard({insight})
              +else()
                InsightCard.SuggestedInsights__item({insight}, size='m')

</template>

<style lang="scss">
  @import '@/mixins';

  $card-width: 365px;
  $card-right-margin: 24px;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--athens);
    margin: 0 -16px 0;
    padding: 24px 0;

    @include responsive('desktop', 'laptop') {
      padding: 40px;
    }

    @media only screen and (min-width: 1140px) {
      width: 100vw;
      margin: 0 0 0 calc((1140px - 100vw) / 2);
    }
  }

  h2 {
    @include text('body-1');
    margin-bottom: 16px;

    @include responsive('desktop', 'laptop') {
      margin-bottom: 26px;
    }
  }

  .visible {
    width: 100%;
    height: 113px;
    overflow: hidden;
    @include responsive('desktop', 'laptop') {
      height: 191px;
    }
  }

  .visible__scroll {
    position: relative;
    overflow: hidden;
    overflow-x: auto;
    height: calc(100% + 10px);

    @include responsive('desktop', 'laptop') {
      width: $card-width * 3 + $card-right-margin * 2;
    }
  }

  .scroll {
    display: flex;
    position: absolute;
    flex: 1;
  }

  .mobile-card {
    margin-right: 16px;
    padding: 18px 24px;
    width: 270px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:first-child {
      margin-left: 16px;
    }
  }

  :global(.SuggestedInsights__item) {
    margin-right: $card-right-margin;
    width: $card-width;

    &:last-child {
      margin: 0;
    }
  }
</style>

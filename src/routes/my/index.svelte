<script context="module">
  import { client } from '@/apollo'
  import { ALL_USER_INSIGHTS } from '@/gql/insights'
  import { onlyPublishedFilter } from '@/utils/insights'

  export async function preload(_, session, { apollo = client }) {
    if (typeof session.currentUser !== 'object') {
      await session.loadingUser
    }
    const { currentUser } = session

    if (!currentUser) {
      return this.redirect(302, '')
    }

    const {
      data: {
        currentUser: { insights },
      },
    } = await apollo.query({
      query: ALL_USER_INSIGHTS,
      fetchPolicy: 'network-only',
    })

    currentUser.insights = insights

    return {
      insights: insights.filter(onlyPublishedFilter),
    }
  }
</script>

<script>
  import Feed from '@/components/Feed'
  import { insightSorter } from '@/stores/insights'
  import ViewportObserver from '@/components/ViewportObserver'
  import InsightCardDesktop from '@/components/insights/InsightCardWithMarketcap'
  import InsightCardMobile from '@/components/insights/InsightCard'
  import { getMobileComponent } from '@/utils/responsive'

  const InsightCard = getMobileComponent(InsightCardMobile, InsightCardDesktop)

  export let insights = []
</script>

<template lang="pug">
svelte:head
  title My Insights
  meta(property='og:title', content='My Insights')
  meta(name='description', property='og:description', content='My Commmunity Insights')

.insights
  Feed(items="{insights.sort($insightSorter)}", dateKey="updatedAt")
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

<script context="module">
  import { client } from '@/apollo'
  import { onlyPublishedFilter } from '@/utils/insights'

  export async function preload(_, session) {
    if (typeof session.currentUser !== 'object') {
      await session.loadingUser
    }
    const { currentUser } = session

    if (!currentUser) {
      return this.redirect(302, '')
    }

    return {
      insights: currentUser.insights.filter(onlyPublishedFilter),
    }
  }
</script>

<script>
  import Feed from '@/components/Feed'
  import ViewportObserver from '@/components/ViewportObserver'
  import InsightCardDesktop from '@/components/insights/InsightCardWithMarketcap'
  import InsightCardMobile from '@/components/insights/InsightCard'
  import { getMobileComponent } from '@/utils/responsive'

  const InsightCard = getMobileComponent(InsightCardMobile, InsightCardDesktop)

  export let insights = []
</script>

<template lang="pug">

.insights
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

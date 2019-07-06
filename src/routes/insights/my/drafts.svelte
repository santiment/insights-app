<script context="module">
  import { client } from '@/apollo'
  import { onlyDraftsFilter } from '@/utils/insights'

  export async function preload(_, session) {
    if (typeof session.currentUser !== 'object') {
      await session.loadingUser
    }
    const { currentUser } = session

    if (!currentUser) {
      return this.redirect(302, '')
    }

    return {
      insights: currentUser.insights.filter(onlyDraftsFilter),
    }
  }
</script>

<script>
  import InsightCard from '@/components/insights/InsightCard'

  export let insights = []
</script>

<template lang="pug">

.insights
  +each('insights as insight')
    div.insights__item
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

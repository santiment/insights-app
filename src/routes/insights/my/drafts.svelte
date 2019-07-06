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
  import DraftCard from '@/components/insights/DraftCard'

  export let insights = []

  const insightsUpdateDateSorter = ({ updatedAt: a }, { updatedAt: b }) =>
    new Date(b) - new Date(a)

  let sortedInsights

  $: sortedInsights = insights.slice().sort(insightsUpdateDateSorter)
</script>

<template lang="pug">

.insights
  +each('sortedInsights as insight')
    DraftCard({insight})

</template>

<style lang="scss">
  @import '@/mixins';

  .insights {
    @include grid-wrap(2);
    grid-template-columns: minmax(0, 1fr) 1fr;
  }
</style>

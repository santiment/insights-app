<script context="module">
  import { client } from '@/apollo'
  import { ALL_USER_INSIGHTS } from '@/gql/insights'
  import { onlyDraftsFilter } from '@/utils/insights'

  export async function preload(_, session, { apollo = client }) {
    if (typeof session.currentUser !== 'object') {
      await session.loadingUser
    }
    const { currentUser } = session

    if (!currentUser) {
      return this.redirect(302, '/experience')
    }

    let insights = []

    try {
      const {
        data: { currentUser },
      } = await apollo.query({
        query: ALL_USER_INSIGHTS,
        fetchPolicy: 'network-only',
      })

      insights= currentUser.insights

    }catch(e) {
      console.log('User drafts error', e)
      return this.redirect(500, '/')
    }

    currentUser.insights = insights

    return {
      insights: insights.filter(onlyDraftsFilter),
    }
  }
</script>

<script>
  import DraftCard from '@/components/insights/DraftCard'
  import Empty from './_Empty.svelte'

  export let insights = []

  const insightsUpdateDateSorter = ({ updatedAt: a }, { updatedAt: b }) =>
    new Date(b) - new Date(a)

  let sortedInsights

  $: sortedInsights = insights.slice().sort(insightsUpdateDateSorter)
</script>

<template lang="pug">
+if('insights.length === 0')
  Empty

.insights.bot-scroll
  +each('sortedInsights as insight (insight.id)')
    DraftCard({insight})
</template>

<style lang="scss">
  @import '@/mixins';

  .insights {
    @include grid-wrap(2);
    grid-template-columns: minmax(0, 1fr) 1fr;
  }
</style>

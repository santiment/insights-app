<script context="module">
  import { client } from '@/apollo'

  export async function preload(page, session, { apollo = client }) {
    if (typeof session.currentUser !== 'object') {
      await session.loadingUser
    }
    const { currentUser } = session

    if (!currentUser) {
      return this.redirect(302, '/experience')
    }

    return {
      currentTrends: page.query.currentTrends,
    }
  }
</script>

<script>
  import Editor from '@/components/insights/Editor'

  export let currentTrends
</script>

<template lang="pug">
svelte:head
  title Creating New Insight - Santiment Insights
  meta(property='og:title', content='Creating New Insight - Santiment Insights')

Editor({currentTrends})
</template>

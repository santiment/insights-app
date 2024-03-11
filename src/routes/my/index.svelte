<script context="module">
  import { redirectToLoginPage } from '@/flow/redirect'
  import { queryUserInsights, queryUserInsightsSSR } from '@/api/insights/user'

  const onlyPublishedFilter = ({ readyState }) => readyState === 'published'

  export async function preload(_, session) {
    if (redirectToLoginPage(this, session)) return

    const userId = session.currentUser && session.currentUser.id

    return {
      userId,
      insights: await queryUserInsightsSSR(1, userId, this).catch((e) => {
        console.log("User's insights error", e)
        return []
      }),
    }
  }
</script>

<script>
  import InsightsFeed from '@cmp/InsightsFeed.svelte'
  import Empty from './_Empty.svelte'

  export let userId = 0
  export let insights = []

  const onData = (insights) => insights.filter(onlyPublishedFilter)
  const query = (page) => queryUserInsights(page, userId).then(onData)
</script>

<svelte:head>
  <title>My Insights</title>
  <meta property="og:title" content="My Insights" />
  <meta name="description" property="og:description" content="My Insights" />
</svelte:head>

{#if insights.length}
  <InsightsFeed {insights} {query} />
{:else}
  <Empty />
{/if}

<script context="module">
  import { redirectToLoginPage } from '@/flow/redirect'
  import { queryCurrentUserInsightsSSR, queryCurrentUserInsights } from '@/api/insights/user'

  const onlyPublishedFilter = ({ readyState }) => readyState === 'published'

  export async function preload(_, session) {
    if (redirectToLoginPage(this, session)) return

    const insights = await queryCurrentUserInsightsSSR(1, this).catch((e) => {
      console.log("User's insights error", e)
      return []
    })

    return { insights: insights.filter(onlyPublishedFilter) }
  }
</script>

<script>
  import InsightsFeed from '@cmp/InsightsFeed.svelte'
  import Empty from './_Empty.svelte'

  export let insights = []

  const onData = (insights) => insights.filter(onlyPublishedFilter)
  const query = (page) => queryCurrentUserInsights(page).then(onData)
</script>

<svelte:head>
  <title>My Insights</title>
  <meta property="og:title" content="My Insights" />
  <meta name="description" property="og:description" content="My Commmunity Insights" />
</svelte:head>

{#if insights.length}
  <InsightsFeed {insights} {query} />
{:else}
  <Empty />
{/if}

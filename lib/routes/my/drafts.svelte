<script context="module">
  import { redirectToLoginPage } from './../../flow/redirect'
  import { queryDraftInsights, queryDraftInsightsSSR } from './../../api/insights/user'

  const onlyDrafts = ({ readyState }) => readyState === 'draft'

  export async function preload(_, session) {
    if (redirectToLoginPage(this, session)) return

    const insights = await queryDraftInsightsSSR(1, this).catch((e) => {
      console.log("User's draft insights error", e)
      return []
    })

    return { insights: insights.filter(onlyDrafts) }
  }
</script>

<script>
  import ViewportPagination from './../../components/ViewportPagination.svelte'
  import Draft from './../../components/InsightCard/Draft.svelte'
  import Empty from './_Empty.svelte'

  export let insights = []

  const onData = (insights) => insights.filter(onlyDrafts)
  const query = (page) => queryDraftInsights(page).then(onData)

  function onDraftDelete(draft) {
    insights = insights.filter((item) => item !== draft)
  }
</script>

<svelte:head>
  <title>My Drafts</title>
  <meta property="og:title" content="My Drafts" />
  <meta name="description" property="og:description" content="My Drafts" />
</svelte:head>

{#if insights.length}
  <ViewportPagination {query} items={insights} let:items>
    <div class="insights">
      {#each items as draft (draft.id)}
        <Draft {draft} onDelete={onDraftDelete} />
      {/each}
    </div>
  </ViewportPagination>
{:else}
  <Empty />
{/if}

<style>
  .insights {
    display: grid;
    grid: auto / 1fr 1fr;
    gap: 24px;
  }
</style>

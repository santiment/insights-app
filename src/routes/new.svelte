<script context="module">
  import { redirectToLoginPage } from '@/flow/redirect'

  export async function preload(page, session) {
    if (redirectToLoginPage(this, session)) return

    const trendTags = page.query.currentTrends
    const trendTag = trendTags ? trendTags.split(',')[0] : undefined
    return { trendTag }
  }
</script>

<script>
  import Editor from '@cmp/Editor/index.svelte'

  export let trendTag
</script>

<svelte:head>
  <title>Creating New Insight - Santiment Insights</title>
  <meta property="og:title" content="Creating New Insight - Santiment Insights" />
</svelte:head>

<div>
  <Editor {trendTag} />
</div>

<style>
  div {
    max-width: 720px;
    margin: 8px auto 0;
    padding-bottom: 120px;
  }
</style>

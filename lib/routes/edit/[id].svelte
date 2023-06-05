<script context="module">
  import { redirectToLoginPage, redirectNonAuthor } from './../../flow/redirect'
  import { queryInsightSSR } from './../../api/insights'

  export async function preload(page, session) {
    if (redirectToLoginPage(this, session)) return

    const { id } = page.params
    const insight = await queryInsightSSR(
      id,
      'isPulse project:priceChartProject{id slug name ticker}',
      this,
    )

    if (redirectNonAuthor(this, session, insight)) return

    return { insight }
  }
</script>

<script>
  import Editor from './../../components/Editor/index.svelte'

  export let insight
</script>

<div>
  <Editor {insight} />
</div>

<style>
  div {
    max-width: 720px;
    margin: 0 auto;
  }
</style>

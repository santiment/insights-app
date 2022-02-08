<script context="module">
  import { getIdFromSEOLink } from 'webkit/utils/url'
  import { queryInsightSSR } from '@/api/insights'

  export async function preload(page) {
    const id = getIdFromSEOLink(page.params.slug)
    const insight = await queryInsightSSR(id, this)

    return { insight }
  }
</script>

<script>
  export let insight

  $: ({ title } = insight)
</script>

<div class="insight">
  <h1 class="h2">{title}</h1>
</div>

<style>
  .insight {
    max-width: 720px;
    margin: 0 auto;
  }
</style>

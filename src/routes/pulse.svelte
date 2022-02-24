<script context="module">
  import { queryAllInsightsSSR } from '@/api/insights'

  const parseTags = (tags) => tags && tags.toUpperCase().split(',')
  const parseOnlyPro = (onlyPro) => onlyPro !== undefined

  export async function preload(page) {
    const { query } = page

    const tags = parseTags(query.tags)
    const onlyPro = parseOnlyPro(query.onlyPro)
    const insights = await queryAllInsightsSSR(1, tags, onlyPro, true, this)

    return { insights, onlyPro, tags }
  }
</script>

<script>
  import TopLinks from './_TopLinks.svelte'
  import InsightsFeed from '@cmp/InsightsFeed.svelte'

  export let insights = []
  export let tags
  export let onlyPro
</script>

<svelte:head>
  <title>Insights</title>
  <meta property="og:title" content="Insights" />
  <meta name="description" content="All Community Insights" />
  <meta property="og:description" content="All Commmunity Insights" />
</svelte:head>

<TopLinks isPulse />

<div class="row">
  <div class="fluid">
    <InsightsFeed {insights} {tags} {onlyPro} isOnlyPulse />
  </div>
</div>

<style>
  .fluid {
    min-width: 0;
  }
</style>

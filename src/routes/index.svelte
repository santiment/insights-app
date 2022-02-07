<script context="module">
  import { queryAllInsightsSSR } from '@/api/insights'

  const parseTags = (tags) => tags && tags.toUpperCase().split(',')
  const parseOnlyPro = (onlyPro) => onlyPro !== undefined

  export async function preload(page) {
    const { query } = page

    const tags = parseTags(query.tags)
    const onlyPro = parseOnlyPro(query.onlyPro)
    const insights = await queryAllInsightsSSR(1, tags, onlyPro, this)

    return {
      insights,
      onlyPro,
      tags,
    }
  }
</script>

<script>
  import Nav from '@/_components/Nav/index.svelte'
  import BackToTop from 'webkit/ui/BackToTop.svelte'
  import TagFilters from '@cmp/TagFilters.svelte'
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

<Nav />

{#if process.browser}
  <BackToTop />
{/if}

<main class="section">
  <a href="/" class="h4 txt-m active">Insights</a>
  <a href="/" class="h4 txt-m">Pulse Insights</a>

  <TagFilters />

  <InsightsFeed {insights} {tags} {onlyPro} />
</main>

<style>
  main {
    padding: 32px 0;
  }

  a {
    margin-right: 32px;
    color: var(--casper);
  }

  .active {
    color: var(--black);
  }
</style>

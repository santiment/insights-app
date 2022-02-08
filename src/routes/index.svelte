<script context="module">
  import { queryAllInsightsSSR } from '@/api/insights'
  import { queryFeaturedInsightsSSR } from '@/api/insights/featured'

  const parseTags = (tags) => tags && tags.toUpperCase().split(',')
  const parseOnlyPro = (onlyPro) => onlyPro !== undefined

  export async function preload(page) {
    const { query } = page

    const tags = parseTags(query.tags)
    const onlyPro = parseOnlyPro(query.onlyPro)
    const insights = await queryAllInsightsSSR(1, tags, onlyPro, this)
    const featured = await queryFeaturedInsightsSSR(this)

    return {
      insights,
      onlyPro,
      tags,
      featured,
    }
  }
</script>

<script>
  import Nav from '@/_components/Nav/index.svelte'
  import BackToTop from 'webkit/ui/BackToTop.svelte'
  import { session } from '@/stores/session'
  import TagFilters from '@cmp/TagFilters.svelte'
  import InsightsFeed from '@cmp/InsightsFeed.svelte'
  import HandpickedTakes from '@cmp/HandpickedTakes.svelte'
  import Conversations from '@cmp/Conversations.svelte'
  import BecomeAnAuthor from '@cmp/BecomeAnAuthor.svelte'

  export let insights = []
  export let featured = []
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

  <div class="row">
    <div class="fluid">
      <InsightsFeed {insights} {tags} {onlyPro} />
    </div>
    <aside class="column">
      {#if $session.isMobile === false}<BecomeAnAuthor />{/if}
      <HandpickedTakes insights={featured} />
      <Conversations />
    </aside>
  </div>
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

  aside {
    width: 353px;
    min-width: 353px;
    height: calc(100vh - 60px);
    position: sticky;
    top: 30px;
    margin: 0 0 0 30px;
  }
</style>

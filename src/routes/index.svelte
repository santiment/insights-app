<script context="module">
  import { queryAllInsightsSSR } from '@/api/insights'
  import { queryFeaturedInsightsSSR } from '@/api/insights/featured'

  const parseTags = (tags) => tags && tags.toUpperCase().split(',')
  const parseFlag = (flag) => flag !== undefined

  export async function preload(page) {
    const { query } = page

    const tags = parseTags(query.tags)
    const onlyPro = parseFlag(query.onlyPro)
    const isPulse = query.isPulse

    const insights = await queryAllInsightsSSR(1, tags, onlyPro, isPulse, this).catch((e) => {
      console.log('Insights error', e)
      return []
    })

    const featured = await queryFeaturedInsightsSSR(this).catch((e) => {
      console.log('Featured insights error', e)
      return []
    })

    return {
      insights,
      onlyPro,
      tags,
      featured,
    }
  }
</script>

<script>
  import { session } from '@/stores/session'
  import TopLinks from './_TopLinks.svelte'
  import Sanr from './_Sanr.svelte'
  import InsightsFeed from '@cmp/InsightsFeed.svelte'
  import HandpickedTakes from '@cmp/HandpickedTakes.svelte'
  import Conversations from '@cmp/Conversations.svelte'
  import BecomeAnAuthor from '@cmp/BecomeAnAuthor.svelte'
  import MobileHeader from '@cmp/MobileHeader.svelte'

  export let insights = []
  export let featured = []
  export let tags
  export let onlyPro

  $: isMobile = $session.isMobile
</script>

<svelte:head>
  <title>Insights</title>
  <meta property="og:title" content="Insights" />
  <meta name="description" content="All Community Insights" />
  <meta property="og:description" content="All Commmunity Insights" />
</svelte:head>

{#if isMobile}
  <MobileHeader />
{/if}

<TopLinks />

<div class="row">
  <div class="fluid">
    <InsightsFeed {insights} {tags} {onlyPro} />
  </div>

  {#if $session.isDesktop}
    <aside class="column">
      <BecomeAnAuthor />
      {#if process.browser}
        <Sanr />
      {/if}
      <HandpickedTakes insights={featured} />
      <Conversations />
    </aside>
  {/if}
</div>

<style lang="scss">
  aside {
    width: 353px;
    min-width: 353px;
    height: calc(100vh - 60px);
    position: sticky;
    top: 30px;
    margin: 0 0 0 30px;
  }

  .fluid {
    min-width: 0;
  }

  :global(body:not(.desktop)) {
    .row {
      padding: 16px 20px;
    }
  }
</style>

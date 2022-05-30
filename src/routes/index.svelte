<script context="module">
  import { queryAllInsightsSSR } from '@/api/insights'
  import { queryFeaturedInsightsSSR } from '@/api/insights/featured'

  const parseTags = (tags) => tags && tags.toUpperCase().split(',')
  const parseOnlyPro = (onlyPro) => onlyPro !== undefined

  export async function preload(page) {
    const { query } = page

    const tags = parseTags(query.tags)
    const onlyPro = parseOnlyPro(query.onlyPro)

    const insights = await queryAllInsightsSSR(1, tags, onlyPro, undefined, this).catch((e) => {
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
  import { onMount } from 'svelte'
  import { track } from 'webkit/analytics'
  import { TwitterTrackActions } from 'webkit/analytics/twitter'
  import { session } from '@/stores/session'
  import TopLinks from './_TopLinks.svelte'
  import InsightsFeed from '@cmp/InsightsFeed.svelte'
  import HandpickedTakes from '@cmp/HandpickedTakes.svelte'
  import Conversations from '@cmp/Conversations.svelte'
  import BecomeAnAuthor from '@cmp/BecomeAnAuthor.svelte'

  export let insights = []
  export let featured = []
  export let tags
  export let onlyPro

  onMount(() => {
    track.event(TwitterTrackActions.pageview)
  })
</script>

<svelte:head>
  <title>Insights</title>
  <meta property="og:title" content="Insights" />
  <meta name="description" content="All Community Insights" />
  <meta property="og:description" content="All Commmunity Insights" />
</svelte:head>

<TopLinks />

<div class="row">
  <div class="fluid">
    <InsightsFeed {insights} {tags} {onlyPro} />
  </div>

  {#if $session.isDesktop}
    <aside class="column">
      <BecomeAnAuthor />
      <HandpickedTakes insights={featured} />
      <Conversations />
    </aside>
  {/if}
</div>

<style>
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
</style>

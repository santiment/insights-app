<script context="module">
  // import { queryAllInsightsSSR } from '@/api/insights'
  // import { queryFeaturedInsightsSSR } from '@/api/insights/featured'
  import { getSanbaseHref, feedQueryToSanbaseSearch } from '@/utils/url'

  export async function preload(page) {
    const { query } = page

    this.redirect(303, getSanbaseHref(`/insights${feedQueryToSanbaseSearch(query)}`))

    // const tags = parseTags(query.tags)
    // const onlyPro = parseFlag(query.onlyPro)
    // const isPulse = query.isPulse

    // const insights = await queryAllInsightsSSR(1, tags, onlyPro, isPulse, this).catch((e) => {
    //   console.log('Insights error', e)
    //   return []
    // })

    // const featured = await queryFeaturedInsightsSSR(this).catch((e) => {
    //   console.log('Featured insights error', e)
    //   return []
    // })

    // return {
    //   insights,
    //   onlyPro,
    //   tags,
    //   featured,
    // }
  }
</script>

<script>
  import { stores } from '@sapper/app'
  import { session } from '@/stores/session'
  import TopLinks from './_TopLinks.svelte'
  import Sanr from './_Sanr.svelte'
  import InsightsFeed from '@cmp/InsightsFeed.svelte'
  import HandpickedTakes from '@cmp/HandpickedTakes.svelte'
  import Conversations from '@cmp/Conversations.svelte'
  import BecomeAnAuthor from '@cmp/BecomeAnAuthor.svelte'
  import MobileHeader from '@cmp/MobileHeader.svelte'
  import { NFT_BATTLE_TAG } from '@/utils/insights'

  export let insights = []
  export let featured = []
  export let tags
  export let onlyPro

  $: isMobile = $session.isMobile

  const { page } = stores()
  $: tags = $page.query.tags
  $: tag = (Array.isArray(tags) ? tags[0] : tags) || ''
</script>

<svelte:head>
  <title>Crypto Insights & Research - Blockchain Analysis & Social Data</title>
  <meta
    property="og:title"
    content="Crypto Insights & Research - Blockchain Analysis & Social Data"
  />
  <meta
    name="description"
    content="Explore our crypto insights and research, which are based on blockchain and social data. We pioneer using behavioral analytics to enhance your investment decisions."
  />
  <meta
    property="og:description"
    content="Explore our crypto insights and research, which are based on blockchain and social data. We pioneer using behavioral analytics to enhance your investment decisions."
  />
</svelte:head>

{#if isMobile}
  <MobileHeader />
{/if}

<TopLinks />

<div class="row">
  <div class="fluid">
    {#if tag.toLowerCase() === NFT_BATTLE_TAG.toLowerCase()}
      <div class="description c-waterloo">
        NFT Battle was a friendly contest we held at the end of 2022 and the beginning of 2023,
        opening the floor to researchers and crypto analysts to deep dive into the NFT dynamics and
        publish on the Santiment platform.
      </div>
    {/if}

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

  .description {
    margin: 0 0 16px;
  }

  :global(body:not(.desktop)) {
    .row {
      padding: 16px 20px;
    }

    .description {
      margin: -8px 0 32px;
    }
  }
</style>

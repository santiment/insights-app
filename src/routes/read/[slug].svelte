<script context="module">
  import { getIdFromSEOLink } from 'webkit/utils/url'
  import { CommentsType } from 'webkit/api/comments'
  import { queryInsightSSR } from '@/api/insights'

  export async function preload(page) {
    const id = getIdFromSEOLink(page.params.slug)
    const insight = await queryInsightSSR(id, this)

    return { insight }
  }
</script>

<script>
  import { getDateFormats } from 'webkit/utils/dates'
  import Svg from 'webkit/ui/Svg/svelte'
  import Comments from 'webkit/ui/Comments/svelte'
  import ViewportObserver from 'webkit/ui/ViewportObserver.svelte'
  import { currentUser } from '@/stores/user'
  import Tags from '@cmp/Tags.svelte'
  import Author from './_Author.svelte'
  import Epilogue from './_Epilogue.svelte'
  import FixedControls from './_FixedControls.svelte'
  import Assets from './_Assets.svelte'

  export let insight

  let hidden = true
  let metaDescriptionText = ''
  let previewImgLink = ''

  $: ({ title, text, user, publishedAt, tags } = insight)

  $: ({ MMM, D, YYYY } = getDateFormats(new Date(publishedAt)))
  $: date = `${MMM} ${D}, ${YYYY}`

  const showSidebar = () => (hidden = false)
  const hideSidebar = () => (hidden = true)
</script>

<svelte:head>
  <title>{title} - Santiment Community Insights</title>
  <meta name="description" content={metaDescriptionText} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{title} - Santiment Community Insights" />
  <meta property="og:description" content={metaDescriptionText} />

  {#if previewImgLink}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={previewImgLink} />
    <meta name="og:image" content={previewImgLink} />
  {/if}
</svelte:head>

<div class="insight">
  {#if process.browser}
    <FixedControls {insight} {hidden} />
    <Assets {insight} />
  {/if}

  <div class="row v-center">
    <a href="/" class="c-casper">Insights</a>
    <Svg id="arrow-right" w="4.5" h="8" class="mrg-m mrg--l mrg--r" />
    <a href="/read/">{title}</a>
  </div>

  <h1 class="h2 mrg-xl mrg--b mrg--t">{title}</h1>

  <Author {user} {date} />

  <div class="text mrg-xl mrg--t">{@html text}</div>

  <div class="tags c-waterloo mrg-xl mrg--t caption">
    <Tags {tags} />
  </div>

  <Author {user} {date} />

  <ViewportObserver
    top
    options={{ rootMargin: '160px 0px -135px' }}
    on:intersect={hideSidebar}
    on:leaving={showSidebar}>
    <Epilogue {insight} />
  </ViewportObserver>

  <div id="comments">
    <Comments
      type={CommentsType.Insight}
      commentsFor={insight}
      currentUser={$currentUser}
      titleClass="h4 c-waterloo" />
  </div>
</div>

<style>
  .insight {
    max-width: 720px;
    margin: 0 auto;
    position: relative;
  }

  .tags {
    padding: 0 0 16px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--porcelain);
  }

  #comments {
    margin-top: 40px;
  }

  #comments :global(form) {
    margin-bottom: 30px;
  }

  #comments :global(form button) {
    height: 40px;
    min-width: 92px;
  }

  #comments :global(form textarea) {
    resize: vertical;
    min-height: 40px;
    padding: 9px 12px;
  }
</style>

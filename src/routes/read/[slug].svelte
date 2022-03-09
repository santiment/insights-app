<script context="module">
  import { getIdFromSEOLink } from 'webkit/utils/url'
  import { CommentsType } from 'webkit/api/comments'
  import { queryInsightSSR } from '@/api/insights'
  import { RELATED_PROJECT_FRAGMENT, queryPriceDataSSR } from '@/api/insights/project'
  import { redirectNonAuthor } from '@/flow/redirect'
  import { queryPriceSincePublication } from '@cmp/PriceSincePublication.svelte'

  export async function preload(page, session) {
    const { currentUser, isMobile } = session
    const { slug } = page.params

    const id = getIdFromSEOLink(slug)
    const DATA = isMobile ? undefined : RELATED_PROJECT_FRAGMENT
    const insight = await queryInsightSSR(id, DATA, this).catch((e) => {
      console.log("Insight doesn't exist", e)
    })

    if (!insight) {
      return this.redirect(302, '/')
    }

    const isDraft = insight.readyState === 'draft'
    if (isDraft && redirectNonAuthor(this, session, insight)) {
      return
    }

    const { user, project, updatedAt } = insight
    const publishedAt = insight.publishedAt || updatedAt
    const isAuthor = currentUser && +currentUser.id === +user.id

    const queryPriceData = (...args) => queryPriceDataSSR(...args, this)
    const priceQuery =
      project && queryPriceSincePublication(project.slug, publishedAt, queryPriceData)

    const projectData = await priceQuery

    return { insight, projectData, link: slug, isAuthor, isDraft }
  }
</script>

<script>
  import { getDateFormats } from 'webkit/utils/dates'
  import Comments from 'webkit/ui/Comments/svelte'
  import ViewportObserver from 'webkit/ui/ViewportObserver.svelte'
  import { currentUser } from '@/stores/user'
  import { session } from '@/stores/session'
  import { checkIsFollowing } from '@/flow/follow'
  import Tags from '@cmp/Tags.svelte'
  import InsightText from '@cmp/InsightText.svelte'
  import Breadcrumbs from './_Breadcrumbs.svelte'
  import Author from './_Author.svelte'
  import Epilogue from './_Epilogue.svelte'
  import FixedControls from './_FixedControls.svelte'
  import Assets from './_Assets.svelte'
  import SuggestedInsights from './_SuggestedInsights.svelte'
  import MetaTags from './_MetaTags.svelte'
  import Paywall from './_Paywall.svelte'

  export let insight
  export let projectData
  export let link
  export let isAuthor
  export let isDraft

  let hidden = true

  $: ({ title, text, user, updatedAt, publishedAt, tags, isPro } = insight)
  $: isPaywalled = isPro
  $: isPaywalled && (hidden = false)

  $: ({ MMM, D, YYYY } = getDateFormats(new Date(publishedAt || updatedAt)))
  $: date = `${MMM} ${D}, ${YYYY}`
  $: isFollowing = checkIsFollowing($currentUser, user.id)

  const showSidebar = () => (hidden = false)
  const hideSidebar = () => (hidden = true)
</script>

<MetaTags {insight} />

<div class="insight">
  {#if process.browser && $session.isDesktop}
    <FixedControls {insight} {link} {hidden} {isAuthor} {isDraft} />
    {#if projectData && isPaywalled === false}
      <Assets {insight} {projectData} />
    {/if}
  {/if}

  <Breadcrumbs {title} {link} />

  <h1 class="h2 mrg-xl mrg--b mrg--t">{title}</h1>

  <Author {user} {date} {isAuthor} {isFollowing} />

  <InsightText {text} class="mrg-xl mrg--t body-1" />

  {#if isPaywalled}
    <Paywall />
  {:else}
    <div class="tags c-waterloo mrg-xl mrg--t caption">
      <Tags {tags} />
    </div>

    <Author {user} {date} {isAuthor} {isFollowing} />

    <ViewportObserver
      top
      options={{ rootMargin: '160px 0px -135px' }}
      on:intersect={hideSidebar}
      on:leaving={showSidebar}>
      <Epilogue {insight} {link} {isDraft} {isAuthor} {isFollowing} />
    </ViewportObserver>

    <div id="comments">
      <Comments
        type={CommentsType.Insight}
        commentsFor={insight}
        currentUser={$currentUser}
        titleClass="h4 c-waterloo" />
    </div>
  {/if}
</div>

{#if process.browser}
  <SuggestedInsights {insight} {user} />
{/if}

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
    flex: 0 0 92px;
    white-space: nowrap;
  }

  #comments :global(form > div) {
    min-height: 40px;
    padding: 9px 12px;
  }
</style>

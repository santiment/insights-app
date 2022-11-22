<script context="module">
  import { getIdFromSEOLink } from 'webkit/utils/url'
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

    return { insight, projectData, slug, isAuthor, isDraft }
  }
</script>

<script>
  import { onMount } from 'svelte'
  import { getDateFormats } from 'webkit/utils/dates'
  import ViewportObserver from 'webkit/ui/ViewportObserver.svelte'
  import { currentUser } from '@/stores/user'
  import { session } from '@/stores/session'
  import { checkIsFollowing } from '@/flow/follow'
  import { InteractionType, mutateStoreUserActivitiy } from '@/api/userActivity'
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
  import Comments from './_Comments.svelte'

  export let insight
  export let projectData
  export let slug
  export let isAuthor
  export let isDraft

  let hidden = true

  $: ({ title, text, user, updatedAt, publishedAt, tags, isPro } = insight)
  $: subscription = $currentUser && $currentUser.subscription
  $: isPaywalled = isPro && !subscription
  $: isPaywalled && (hidden = false)
  $: link = encodeURIComponent(slug)

  $: ({ MMM, D, YYYY } = getDateFormats(new Date(publishedAt || updatedAt)))
  $: date = `${MMM} ${D}, ${YYYY}`
  $: isFollowing = checkIsFollowing($currentUser, user.id)
  $: isMobile = $session.isMobile

  const showSidebar = () => (hidden = false)
  const hideSidebar = () => (hidden = true)

  onMount(() => {
    if ($currentUser) {
      mutateStoreUserActivitiy(insight.id, InteractionType.VIEW)
    }
  })
</script>

<MetaTags {insight} />

<div class="insight">
  {#if process.browser && $session.isDesktop}
    <FixedControls {insight} {link} {hidden} {isAuthor} {isDraft} />
    {#if projectData && isPaywalled === false}
      <Assets {insight} {projectData} />
    {/if}

    <Breadcrumbs {title} {link} />
  {/if}

  <h1 class={isMobile ? 'h3' : 'h2 mrg-xl mrg--b mrg--t'}>{title}</h1>

  <Author {user} {date} {isAuthor} {isFollowing} source="insights_article_top" />

  <InsightText {text} class="$style.insight-text mrg-xl mrg--t body-1" />

  {#if isPaywalled}
    <Paywall />
  {:else}
    <div class="tags c-waterloo mrg-xl mrg--t caption row">
      <Tags {tags} />
    </div>

    <Author {user} {date} {isAuthor} {isFollowing} source="insights_article_bottom" />

    <div class="divider" />

    <ViewportObserver
      top
      options={{ rootMargin: '160px 0px -135px' }}
      on:intersect={hideSidebar}
      on:leaving={showSidebar}
    >
      <Epilogue {insight} {link} {isDraft} {isAuthor} {isFollowing} />
    </ViewportObserver>

    <Comments {insight} />
  {/if}
</div>

{#if process.browser}
  <SuggestedInsights {insight} {user} />
{/if}

<style lang="scss">
  .insight {
    max-width: 720px;
    margin: 0 auto;
    position: relative;
  }

  .tags {
    gap: 4px;
  }

  .divider {
    height: 1px;
    background-color: var(--porcelain);
    margin: 16px 0 20px;
  }

  :global(body:not(.desktop)) {
    .insight {
      padding: 24px 20px 0;
    }

    h1 {
      margin-bottom: 20px;
    }

    .insight-text {
      margin-top: 40px;
    }

    .tags {
      margin-top: 40px;
      gap: 8px;
    }

    .divider {
      margin-top: 20px;
    }
  }
</style>

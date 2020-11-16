<script context="module">
  import { client } from '@/apollo'
  import { getInsightIdFromSEOLink, noTrendTagsFilter } from '@/utils/insights'
  import { INSIGHT_BY_ID_QUERY } from '@/gql/insights'
  import { getTimeIntervalFromToday, DAY } from '@/utils/dates'
  import { getComments } from '@/logic/comments'
  import { getProjectByTicker } from '@/logic/projects'
  import { getPriceData } from '@/logic/insights'
  const loadComments = () => import('@/components/insights/Comments')

  // TODO: Think of a better way to do a ssr loadable component [@vanguard | Jan 17, 2020]
  let PreloadedComments = null
  if (!process.browser) {
    import('@/components/insights/Comments').then(
      (res) => (PreloadedComments = res.default),
    )
  }

  export async function preload(page, session, { apollo = client }) {
    const { slug } = page.params
    const id = getInsightIdFromSEOLink(slug)

    let comments

    if (page.query._wc) {
      await Promise.all[
        (getComments(id, undefined, apollo).then(
          ({ data }) => (comments = data.comments),
        ),
        PreloadedComments)
      ]
    }

    const { data } = await apollo.query({
      query: INSIGHT_BY_ID_QUERY,
      variables: {
        id,
      },
    })

    if (data.insight.readyState === 'draft') {
      if (session.currentUser === undefined) await session.loadingUser

      const { currentUser } = session
      if (!currentUser || currentUser.id !== data.insight.user.id) {
        this.redirect(302, '/')
      }
    }

    if (session.isMobile) {
      return { ...data.insight, comments }
    }

    const { from, to } = getTimeIntervalFromToday(-7, DAY)

    const isoFrom = from.toISOString()
    const isoTo = to.toISOString()

    const projectPriceExtractor = (project) => ({ data }) => ({
      ...project,
      historyPrice: data.historyPrice,
    })
    const getAssetPriceData = (project) =>
      getPriceData(project.slug, isoFrom, isoTo, apollo).then(
        projectPriceExtractor(project),
      )

    let assetTickers = data.insight.tags.filter(noTrendTagsFilter)
    const { priceChartProject } = data.insight
    let chartProjectPriceData

    if (priceChartProject && assetTickers.length) {
      const ticker = priceChartProject.ticker.toLowerCase()
      chartProjectPriceData = getAssetPriceData(priceChartProject)
      assetTickers = assetTickers.filter(
        ({ name }) => name.toLowerCase() !== ticker,
      )
    }

    let assets = []
    try {
      assets = await Promise.all([
        chartProjectPriceData,
        ...assetTickers.map(({ name: ticker }) =>
          getProjectByTicker(ticker, apollo)
            .then(getAssetPriceData)
            .catch(() => {}),
        ),
      ])
    } catch (e) {
      console.log(e)
    }

    return {
      ...data.insight,
      assets: assets.filter(Boolean),
      comments,
      seoLink: slug,
    }
  }
</script>

<script>
  import { setContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { stores } from '@sapper/app'
  import ViewportObserver from '@/components/ViewportObserver'
  import Tags from '@/components/insights/Tags'
  import Text from '@/components/insights/Text'
  import ProfileInfo from '@/components/ProfileInfo'
  import Loadable from '@/components/Loadable'
  import Dialog from '@/ui/dialog/index'
  import SuggestedInsights from '@/components/insights/SuggestedInsights'
  import FeaturedAssets from '@/components/assets/FeaturedAssets'
  import PaymentDialog from '@/components/PaymentDialog/index.svelte'
  import Thanks from './_components/Thanks.svelte'
  import Author from './_components/Author.svelte'
  import Banner from './_components/Banner.svelte'
  import Breadcrumbs from './_components/Breadcrumbs.svelte'
  import Paywall from './_components/Paywall.svelte'
  import FixedControls from './_components/FixedControls.svelte'
  import ReadAnalytics from './_components/ReadAnalytics.svelte'
  import { getShareLink } from '@/logic/share'
  import {
    getPostponedPaymentInsight,
    removePostponedPayment,
  } from '@/logic/insights'
  import { getRawText, grabFirstImageLink } from '@/utils/insights'
  import { user$ } from '@/stores/user'
  import { subscription$ } from '@/stores/user/subscription'
  const loadSuggestedInsights = () =>
    import('@/components/insights/SuggestedInsights')

  export let id,
    text,
    title,
    tags,
    user,
    votes,
    createdAt,
    publishedAt = createdAt,
    votedAt,
    readyState,
    assets = [],
    commentsCount,
    comments,
    isPaywallRequired,
    seoLink

  const commentsCounter = writable(commentsCount)
  setContext('commentsCount', {
    subscribe: commentsCounter.subscribe,
    set: (value) => {
      commentsCount = value
      commentsCounter.set(value)
    },
  })

  $: {
    commentsCounter.set(commentsCount)
  }

  const { session } = stores()
  const userSubscription = subscription$()
  const currentUser = user$()

  const classes = { wrapper: 'info__profile' }
  const previewImgLink = grabFirstImageLink(text)
  const metaDescriptionText = getRawText(text).slice(0, 140)

  const options = {
    rootMargin: '160px 0px -135px',
  }
  const commentsOptions = {
    rootMargin: '100% 0px 200px',
  }
  const suggestionOptions = {
    rootMargin: '100% 0px 300px',
  }

  let open = false
  let clientHeight
  let hidden = true
  let currentVoting = 0
  $: shareLink = getShareLink(id)

  $: isMobile = $session.isMobile
  $: shouldLoadSuggestions = !id
  $: shouldLoadComments = !id

  $: liked = !!votedAt

  $: isAuthor = $currentUser && user.id === $currentUser.id
  $: isPro = $userSubscription && $userSubscription.plan.name === 'PRO'
  $: hasPaywall = isPaywallRequired && !(isAuthor || isPro)

  $: if (hasPaywall) {
    hidden = false
  }

  function hideSidebar() {
    hidden = true
  }

  function showSidebar() {
    hidden = false
  }

  function showSuggestions() {
    shouldLoadSuggestions = true
  }

  function showComments() {
    shouldLoadComments = true
  }

  function onUpgradeClick() {
    open = true
  }

  function onPaymentSuccess() {
    open = false
    setTimeout(() => window.location.reload(), 3000)
  }

  onMount(() => {
    if ($currentUser && getPostponedPaymentInsight()) {
      open = true
      removePostponedPayment()
    }
  })
</script>

<template lang="pug">
include /ui/mixins

svelte:head
  title {title} - Santiment Community Insights
  meta(name='description', content='{metaDescriptionText}')
  meta(property='og:type', content='article')
  meta(property='og:title', content='{title} - Santiment Community Insights')
  meta(property='og:description', content='{metaDescriptionText}')
  +if('previewImgLink')
    meta(name='twitter:card',content='summary_large_image')
    meta(name='twitter:image', content='{previewImgLink}')
    meta(name='og:image', content='{previewImgLink}')

.insight(bind:clientHeight)
  Breadcrumbs({title}, {seoLink})

  h1.title {title}
  Author({user}, {publishedAt}, {isAuthor})
  Text({text})

  +if('hasPaywall')
    Paywall(on:upgradeClick='{onUpgradeClick}')

    +else()
      .bottom
        Tags({tags})
        .info
          Author({user}, {publishedAt}, {isAuthor})
          ViewportObserver({options}, on:intersect='{hideSidebar}', on:leaving='{showSidebar}', top)
            Thanks({id}, {votes}, {readyState}, {commentsCount}, {isAuthor}, bind:currentVoting)
          Banner({user}, {isAuthor})

  +if('assets.length && !isMobile')
    .assets
      FeaturedAssets({assets}, {publishedAt}, insightId='{id}')

  +if('!isMobile')
    FixedControls({id}, {readyState}, {commentsCount}, {shareLink}, {votes}, {hidden}, {isAuthor}, bind:currentVoting)

+if('!hasPaywall')
  ViewportObserver(id='comments', options='{commentsOptions}', on:intersect='{showComments}', top)
    +if('readyState !== "draft" && (comments || shouldLoadComments)')
      Loadable(load='{loadComments}', {id}, authorId='{user.id}', {comments}, Component='{PreloadedComments}')

ViewportObserver(options='{suggestionOptions}', on:intersect='{showSuggestions}', top)
  +if('shouldLoadSuggestions')
    Loadable(load='{loadSuggestedInsights}', {id}, userId='{+user.id}')

+if('open')
  PaymentDialog(bind:open, on:success='{onPaymentSuccess}')

ReadAnalytics({id})

.bot-scroll
</template>

<style lang="scss">
  @import '@/mixins';

  .assets {
    position: absolute;
    top: 90px;
    left: calc(100% + 30px);

    @media screen and (min-width: 1320px) {
      left: calc(100% + 60px);
    }
  }

  .insight {
    max-width: 720px;
    margin: 0 auto;

    @media only screen and (max-width: 1215px) and (min-width: 992px) {
      max-width: 670px;
    }

    :global(&__profile) {
      max-width: 80%;
    }
  }

  .title {
    @include text('h2', 'm');
    margin: 0 0 25px;
    word-break: break-word;

    @include responsive('phone', 'phone-xs') {
      @include text('h3', 'm');
    }
  }

  .bottom {
    margin-top: 30px;
  }

  .info {
    margin-top: 16px;
    border-top: 1px solid var(--porcelain);
    padding: 20px 0;
    max-width: 100%;
  }
</style>

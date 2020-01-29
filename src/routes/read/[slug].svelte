<script context="module">
  import { client } from '@/apollo'
  import { getInsightIdFromSEOLink, noTrendTagsFilter } from '@/utils/insights'
  import { INSIGHT_BY_ID_QUERY } from '@/gql/insights'
  import { HISTORY_PRICE_QUERY } from '@/gql/metrics'
  import { PROJECTS_BY_TICKER_QUERY } from '@/gql/projects'
  import { getTimeIntervalFromToday, DAY } from '@/utils/dates'
  import { getComments } from '@/logic/comments'
  const loadComments = () => import('@/components/insights/Comments')

  // TODO: Think of a better way to do a ssr loadable component [@vanguard | Jan 17, 2020]
  let PreloadedComments = null
  if (!process.browser) {
    import('@/components/insights/Comments').then(
      res => (PreloadedComments = res.default),
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
      /* fetchPolicy: process.browser ? undefined : 'network-only', */
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

    const assets = await Promise.all(
      data.insight.tags.filter(noTrendTagsFilter).map(({ name: ticker }) =>
        apollo
          .query({
            query: PROJECTS_BY_TICKER_QUERY,
            variables: { ticker },
          })
          .then(({ data: { allProjectsByTicker } }) => {
            const project = allProjectsByTicker[0]
            if (!project) {
              return Promise.reject()
            }

            return client
              .query({
                query: HISTORY_PRICE_QUERY,
                variables: {
                  slug: project.slug,
                  from: isoFrom,
                  to: isoTo,
                  interval: '6h',
                },
              })
              .then(({ data: { historyPrice } }) => ({
                ...project,
                historyPrice,
              }))
          })
          .catch(() => {}),
      ),
    )

    return {
      ...data.insight,
      assets: assets.filter(Boolean),
      comments,
    }
  }
</script>

<script>
  import { stores } from '@sapper/app'
  import ViewportObserver from '@/components/ViewportObserver'
  import Tags from '@/components/insights/Tags'
  import Text from '@/components/insights/Text'
  import LikeBtn from '@/components/LikeBtn'
  import ShareBtn from '@/components/sharing/ShareBtn'
  import CommentCounter from '@/components/comments/Counter'
  import ProfileInfo from '@/components/ProfileInfo'
  import Loadable from '@/components/Loadable'
  import Dialog from '@/ui/dialog/index'
  import SuggestedInsights from '@/components/insights/SuggestedInsights'
  // TODO: Lazy load FeaturedAssets [@vanguard | Nov 11, 2019]
  import FeaturedAssets from '@/components/assets/FeaturedAssets'
  import { getDateFormats } from '@/utils/dates'
  import { getRawText, grabFirstImageLink } from '@/utils/insights'
  const loadSuggestedInsights = () =>
    import('@/components/insights/SuggestedInsights')
  const loadAnonBanner = () => import('@/components/Banner/BannerInsight')
  const loadFollowBanner = () => import('@/components/Banner/FollowBanner')
  const loadFollowBtn = () => import('@/components/FollowBtn')

  export let id,
    text,
    title,
    tags,
    user,
    votes,
    publishedAt,
    createdAt,
    votedAt,
    readyState,
    assets = [],
    commentsCount,
    comments

  const { session } = stores()
  const classes = { wrapper: 'info__profile' }
  const previewImgLink = grabFirstImageLink(text)
  const metaDescriptionText = getRawText(text).slice(0, 140)

  const options = {
    rootMargin: '20px 0px 20px',
  }
  const commentsOptions = {
    rootMargin: '100% 0px 200px',
  }
  const suggestionOptions = {
    rootMargin: '100% 0px 300px',
  }

  let clientHeight
  let hidden = true
  let shouldLoadSuggestions = false
  let shouldLoadComments = false
  let insightDate
  let link
  let shareLink

  $: currentUser = $session.currentUser

  $: liked = !!votedAt

  $: {
    const { MMM, D, YYYY } = getDateFormats(new Date(publishedAt || createdAt))
    insightDate = `${MMM} ${D}, ${YYYY}`
  }

  $: isAuthor = currentUser && user.id === currentUser.id

  $: isNotFollowed =
    currentUser &&
    currentUser.following.users.every(following => following.id !== user.id)

  $: if (process.browser && id) {
    link = window.location.pathname
    shareLink = window.location.origin + link
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
  h1.title {title}
  .insight__info
    ProfileInfo(name="{user.username}", id="{user.id}", avatarUrl="{user.avatarUrl}", status="{insightDate}", classes!='{{wrapper: "insight__profile"}}', withPic)
    +if('!isAuthor')
      Loadable(load="{loadFollowBtn}", targetId='{user.id}')
  Text({text})

  +if('$session.currentUser')
    +if('isNotFollowed && !isAuthor')
      Loadable(load="{loadFollowBanner}", targetId='{user.id}', author='{user.username}')
    +else()
      Loadable(load="{loadAnonBanner}")

  .bottom
    Tags({tags})
    .info
      .info__block.info__block_left
        ProfileInfo(name="{user.username}", id="{user.id}", avatarUrl="{user.avatarUrl}", status="{insightDate}", classes='{classes}', withPic)
        +if('$session.currentUser && !isAuthor')
          Loadable(load="{loadFollowBtn}", targetId='{user.id}')
      ViewportObserver({options}, on:intersect='{hideSidebar}', on:leaving='{showSidebar}', top)
        .info__block
          +if('readyState !== "draft"')
            LikeBtn({id}, bind:liked, likes='{votes.totalVotes}')
            ShareBtn.info__share(link='{shareLink}')
          +if('isAuthor')
            a.edit.edit_fixed(href='/edit/{id}')
              +icon('edit').edit__icon
      .info__fixed(class:hidden)
        +if('readyState !== "draft"')
          LikeBtn({id}, bind:liked, likes='{votes.totalVotes}')
          CommentCounter.fixed-comments-count({link}, {commentsCount})
          ShareBtn(link='{shareLink}')
        +if('isAuthor')
          a.edit(href='/edit/{id}')
            +icon('edit').edit__icon

  +if('assets.length && !$session.isMobile')
    .assets
      FeaturedAssets({assets})

ViewportObserver(id='comments', options='{commentsOptions}', on:intersect='{showComments}', top)
  +if('comments || shouldLoadComments')
    Loadable(load='{loadComments}', {id}, authorId='{user.id}', {commentsCount}, {comments}, Component='{PreloadedComments}')


ViewportObserver(options='{suggestionOptions}', on:intersect='{showSuggestions}', top)
  +if('shouldLoadSuggestions')
    Loadable(load='{loadSuggestedInsights}', {id}, userId='{+user.id}')

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

    &__info {
      display: flex;
      align-items: flex-start;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;

    :global(&__profile) {
      max-width: 65%;

      @include responsive('phone', 'phone-xs') {
        max-width: 100%;
      }
    }

    &__block {
      display: flex;

      &_left {
        align-items: flex-start;
        flex: 1;

        @include responsive('phone', 'phone-xs') {
          max-width: 50%;
        }
      }
    }

    &__fixed {
      display: none;
      transition: opacity 150ms ease-in;
      opacity: 1;
      &.hidden {
        opacity: 0;
        pointer-events: none;
      }

      @include responsive('desktop', 'laptop') {
        position: fixed;
        top: 200px;
        flex-direction: column;
        display: flex;
        align-items: start;
        right: calc(50% + 440px);
      }
    }

    :global(&__share) {
      margin-left: 30px;
      fill: var(--waterloo);
      @include responsive('phone-xs') {
        margin-left: 16px;
      }
    }
  }

  .edit {
    margin: 20px 0 0;

    &_fixed {
      margin: 0 0 0 30px;
    }
  }
  .edit__icon {
    @include size(16px);
    cursor: pointer;

    &:hover {
      fill: var(--jungle-green);
    }
  }

  :global(.fixed-comments-count) {
    margin: 16px 0;
  }
</style>

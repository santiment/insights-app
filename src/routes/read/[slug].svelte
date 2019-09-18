<script context="module">
  import { client } from '@/apollo'
  import { getInsightIdFromSEOLink } from '@/utils/insights'
  import { INSIGHT_BY_ID_QUERY } from '@/gql/insights'

  export async function preload(page, session) {
    const { slug } = page.params
    const id = getInsightIdFromSEOLink(slug)

    const { data } = await client.query({
      query: INSIGHT_BY_ID_QUERY,
      variables: {
        id,
      },
    })

    if (data.insight.readyState === 'draft') {
      if (session.currentUser === undefined) await session.loadingUser

      const { currentUser } = session
      if (!currentUser || currentUser.id !== data.insight.user.id) {
        this.redirect(302, '/insights')
      }
    }

    return { ...data.insight }
  }
</script>

<script>
  import { stores } from '@sapper/app'
  import ViewportObserver from '@/components/ViewportObserver'
  import Tags from '@/components/insights/Tags'
  import LikeBtn from '@/components/LikeBtn'
  import ShareBtn from '@/components/sharing/ShareBtn'
  import ProfileInfo from '@/components/ProfileInfo'
  import Loadable from '@/components/Loadable'
  import Dialog from '@/ui/dialog/index'
  import Modal from '@/components/Modal'
  import { getDateFormats } from '@/utils/dates'
  import { getRawText, grabFirstImageLink } from '@/utils/insights'

  const { session } = stores()
  const classes = { wrapper: 'info__profile' }

  export let id, text, title, tags, user, votes, publishedAt, createdAt, votedAt

  const previewImgLink = grabFirstImageLink(text)

  let liked = !!votedAt
  let clientHeight

  const { MMM, D, YYYY } = getDateFormats(new Date(publishedAt || createdAt))
  const insightDate = `${MMM} ${D}, ${YYYY}`

  const loadAnonBanner = () => import('@/components/Banner/BannerInsight')
  const loadFollowBanner = () => import('@/components/Banner/FollowBanner')
  const loadFollowBtn = () => import('@/components/FollowBtn')

 const isNotFollowed = $session.currentUser && $session.currentUser.following.every((following) => following.id !== user.id)

  const shareLink =
    process.browser && window.location.origin + window.location.pathname

  let enlargedImgSrc
  function enlargeImg({ target }) {
    if (target.tagName !== 'IMG') return
    enlargedImgSrc = target.src
  }
  function closeModal() {
    enlargedImgSrc = undefined
  }

  const options = {
    rootMargin: '100% 0px 20px',
  }

  let hidden = true
  function hideSidebar() {
    hidden = true
  }
  function showSidebar() {
    hidden = false
  }
</script>

<template lang="pug">
include /ui/mixins

svelte:head
  title {title} - Santiment Community Insights
  meta(property='og:type', content='article')
  meta(property='og:title', content='{title} - Santiment Community Insights')
  meta(property='og:description', content='{getRawText(text).slice(0,140)}')
  +if('previewImgLink')
    meta(name='twitter:card',content='summary_large_image')
    meta(name='twitter:image', content='{previewImgLink}')
    

.insight(bind:clientHeight)
  h1.title {title}
  .insight__info
    ProfileInfo(name="{user.username}", id="{user.id}", status="{insightDate}", classes!='{{wrapper: "insight__profile"}}', withPic)
    +if('$session.currentUser')
      Loadable(load="{loadFollowBtn}", targetId='{user.id}')
  div.text(on:click='{enlargeImg}') {@html text}

  +if('$session.currentUser')
    +if('isNotFollowed')
      Loadable(load="{loadFollowBanner}", targetId='{user.id}')
    +else()
      Loadable(load="{loadAnonBanner}")

  .bottom.bot-scroll
    Tags({tags})
    .info
      .info__block.info__block_left
        ProfileInfo(name="{user.username}", id="{user.id}", status="{insightDate}", classes='{classes}', withPic)
        +if('$session.currentUser')
          Loadable(load="{loadFollowBtn}", targetId='{user.id}')
      ViewportObserver({options}, on:intersect='{hideSidebar}', on:leaving='{showSidebar}', top)
        .info__block
          LikeBtn({id}, bind:liked, likes='{votes.totalVotes}')
          ShareBtn.info__share(link='{shareLink}')
      .info__fixed(class:hidden)
        LikeBtn({id}, bind:liked, likes='{votes.totalVotes}')
        ShareBtn.fixed-share(link='{shareLink}')

Modal(bind:open='{enlargedImgSrc}')
  .enlarger(slot='content')
    +icon('close').enlarger__close(on:click='{closeModal}')
    img.enlarger__img(src='{enlargedImgSrc}', alt='Modal pic')

</template>

<style lang="scss">
  @import '@/mixins';

  .insight {
    max-width: 720px;
    margin: 0 auto;

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

    @include responsive('phone', 'phone-xs') {
      @include text('h3', 'm');
    }
  }

  .text {
    margin: 25px 0 0;

    :global(*) {
      @include text('body-1');
    }

    :global(.md-block-image) {
      text-align: center;
      margin: 10px;
    }

    :global(img) {
      max-width: 70%;
      cursor: pointer;
    }

    :global(.md-inline-link) {
      text-decoration: underline;
    }

    :global(.md-block-unordered-list-item) {
      padding-left: 35px;
      margin: 10px 0 40px;

      :global(li) {
        list-style: disc outside;
      }
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
        left: calc((50% - 360px) / 2);
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

  .enlarger {
    width: 84%;
    margin: 5% auto 0;
    position: relative;

    &__close {
      @include size(12px);
      position: absolute;
      top: 0;
      right: -20px;
      fill: #fff;
      cursor: pointer;

      &:hover {
        fill: var(--jungle-green);
      }
    }

    &__img {
      width: 100%;
    }
  }

  :global(.fixed-share) {
    margin-top: 16px;
  }
</style>

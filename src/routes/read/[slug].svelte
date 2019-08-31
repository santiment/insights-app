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
  import Tags from '@/components/insights/Tags'
  import LikeBtn from '@/components/LikeBtn'
  import ShareBtn from '@/components/sharing/ShareBtn'
  import ProfileInfo from '@/components/ProfileInfo'
  import Loadable from '@/components/Loadable'
  import { getDateFormats } from '@/utils/dates'

  const { session } = stores()
  const classes = { wrapper: 'info__profile' }

  export let id, text, title, tags, user, votes, publishedAt, createdAt, votedAt

  let clientHeight

  const { MMM, D, YYYY } = getDateFormats(new Date(publishedAt || createdAt))
  const insightDate = `${MMM} ${D}, ${YYYY}`

  const loadBanner = () => import('@/components/Banner/BannerInsight')

  const shareLink =
    process.browser && window.location.origin + window.location.pathname
</script>

<template lang="pug">

svelte:head
  title Community Insight: {title} - SANbase
  meta(property='og:title', content='Community Insight: {title} - SANbase')
  meta(name='description', property='og:description', content='{text.slice(0,140)}')

.insight(bind:clientHeight)
  div.title {title}
  ProfileInfo(name="{user.username}", id="{user.id}", status="{insightDate}", withPic)
  div.text {@html text}

+if('$session.currentUser === null')
  Loadable(load="{loadBanner}", insightHeight='{clientHeight}')

.bottom
  Tags({tags})
  .info
    ProfileInfo(name="{user.username}", id="{user.id}", status="{insightDate}", classes='{classes}', withPic)
    .info__right
      LikeBtn({id}, liked='{!!votedAt}', likes='{votes.totalVotes}')
      ShareBtn.info__share(link='{shareLink}')

</template>

<style lang="scss">
  @import '@/mixins';

  .title {
    @include text('h2', 'm') margin: 14px 0 25px;
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
    }

    &__right {
      display: flex;
    }

    :global(&__share) {
      margin-left: 30px;
      fill: var(--waterloo);
      @include responsive('phone-xs') {
        margin-left: 16px;
      }
    }
  }
</style>

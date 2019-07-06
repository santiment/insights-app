<script context="module">
  import { client } from '@/apollo'
  import { getInsightIdFromSEOLink } from '@/utils/insights'
  import { INSIGHT_BY_ID_QUERY } from '@/gql/insights'

  export async function preload(page) {
    const { slug } = page.params
    const id = getInsightIdFromSEOLink(slug)

    const res = await client.query({
      query: INSIGHT_BY_ID_QUERY,
      variables: {
        id,
      },
    })

    return { ...res.data.insight }
  }
</script>

<script>
  import { getDateFormats } from '@/utils/dates'
  import ProfileInfo from '@/components/ProfileInfo'
  import Loadable from '@/components/Loadable'
  import { stores } from '@sapper/app'

  const { session } = stores()

  export let text, title, tags, user, votes, publishedAt, createdAt

  let clientHeight

  const { MMM, D, YYYY } = getDateFormats(new Date(publishedAt || createdAt))
  const insightDate = `${MMM} ${D}, ${YYYY}`

  const loadBanner = () => import('@/components/Banner/BannerInsight')
</script>

<template lang="pug">

svelte:head
  title Community Insight: {title} - SANbase
  meta(property='og:title', content='Community Insight: {title} - SANbase')
  meta(name='description', property='og:description', content='{text.slice(0,140)}')

.insight(bind:clientHeight)
  ProfileInfo(name="{user.username}", id="{user.id}", status="{insightDate}", withPic)
  div.title {title}
  div.text {@html text}

+if('$session.currentUser === null')
  Loadable(load="{loadBanner}", insightHeight='{clientHeight}')
</template>

<style lang="scss">
  .title {
    font-weight: 800;
    line-height: 50px;
    font-size: 38px;
    margin: 25px 0 14px;
    font-family: sans-serif;
  }

  .text {
    :global(*) {
      font-size: 18px;
      line-height: 28px;
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
</style>

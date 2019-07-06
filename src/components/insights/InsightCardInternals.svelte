<script>
  import ProfileInfo from '@/components/ProfileInfo'
  import LikeBtn from '@/components/LikeBtn'
  import { getDateFormats } from '@/utils/dates'
  import { getSEOLinkFromIdAndTitle, noTrendTagsFilter } from '@/utils/insights'

  let klass = ''
  export { klass as class }
  export let id,
    user,
    title,
    tags,
    createdAt,
    updatedAt,
    publishedAt,
    state,
    votes,
    votedAt

  let filteredTags
  $: filteredTags = tags.filter(noTrendTagsFilter)

  const seoLink = getSEOLinkFromIdAndTitle(id, title)
  const { MMM, DD, YYYY } = getDateFormats(new Date(publishedAt || updatedAt))
  const time = `${MMM} ${DD}, ${YYYY}`
</script>

<template lang="pug">
include /ui/mixins

.top
  div
    +each('filteredTags as {name}')
      +button.tag(href="/insights/tags/{name}", border) {name}
  a.title(href="/insights/read/{seoLink}") {title}

.bottom
  .bottom__left
    ProfileInfo(name="{user.username}", id="{user.id}", status="{time}", withPic)
  LikeBtn({id}, liked='{!!votedAt}', likes='{votes.totalVotes}')

</template>

<style lang="scss">
  @import '@/variables';

  .top {
    flex: 1;
  }

  :global(.tag) {
    height: auto;
    padding: 1px 6px;
    color: var(--grey-dark-2);
    box-sizing: border-box;
    border: 1px solid var(--grey-light-2);
    line-height: 20px;
    font-size: 12px;
    display: inline-block;
    margin-right: 4px;
    text-decoration: none;
    text-transform: lowercase;
  }

  .title {
    line-height: 26px;
    font-size: 18px;
    margin-top: 18px;
    display: block;
    word-break: break-word;

    &:hover {
      color: var(--jungle-green);
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__left {
      max-width: calc(70% - 40px);
      flex: 1;
    }
  }

  .awaiting {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 18px;
    fill: var(--casper);
    color: var(--casper);

    &__icon {
      width: 12px;
      margin-right: 5px;
    }
  }
</style>

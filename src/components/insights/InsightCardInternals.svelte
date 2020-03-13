<script>
  import ProfileInfo from '@/components/ProfileInfo'
  import LikeBtn from '@/components/LikeBtn'
  import CommentCounter from '@/components/comments/Counter'
  import MultilineText from '@/components/MultilineText'
  import Tag from '@/components/insights/Tag'
  import Tags from './Tags.svelte'
  import { getDateFormats } from '@/utils/dates'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'

  let klass = ''
  export { klass as class }
  export let insight,
    size = 'xl'

  let {
    id,
    user,
    title,
    tags,
    createdAt,
    updatedAt,
    publishedAt,
    state,
    votes,
    votedAt,
    commentsCount,
  } = insight

  const AWAITING_APPROVAL_STATE = 'awaiting_approval'
  const seoLink = getSEOLinkFromIdAndTitle(id, title)
  const { MMM, DD, YYYY } = getDateFormats(new Date(publishedAt || updatedAt))
  const status =
    state === AWAITING_APPROVAL_STATE
      ? 'Awaiting approval'
      : `${MMM} ${DD}, ${YYYY}`

  const link = `/read/${seoLink}`
</script>

<template lang="pug">
include /ui/mixins

.top
  a.title(href="{link}", class='{size}')
    MultilineText(maxLines='{2}') {title}
  ProfileInfo(name="{user.username}", id="{user.id}", avatarUrl="{user.avatarUrl}", status="{status}",
  withPic, classes="{{wrapper: 'card__profile'}}")

.bottom
  .bottom__left
    LikeBtn({id}, liked='{!!votedAt}', likes='{votes.totalVotes}')
    CommentCounter.Card__comments({link}, {commentsCount})

  div
    Tags({tags})

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .top {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid var(--porcelain);
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  .title {
    @include text('h4');
    display: block;
    word-break: break-word;
    margin-bottom: 14px;

    &.m {
      @include text('body-1');
    }

    &:hover {
      color: var(--jungle-green);
    }

    @include responsive('phone', 'phone-xs') {
      @include text('body-1');
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__left {
      max-width: calc(70% - 40px);
      flex: 1;
      white-space: nowrap;
      margin-right: 20px;
    }
  }

  :global(.Card__comments) {
    margin-left: 22px;
  }

  :global(.card__profile) {
    max-width: 400px;
  }
</style>

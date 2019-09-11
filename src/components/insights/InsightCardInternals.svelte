<script>
  import ProfileInfo from '@/components/ProfileInfo'
  import LikeBtn from '@/components/LikeBtn'
  import MultilineText from '@/components/MultilineText'
  import Tag from '@/components/insights/Tag'
  import Tags from './Tags.svelte'
  import { getDateFormats } from '@/utils/dates'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'

  const AWAITING_APPROVAL_STATE = 'awaiting_approval'

  let klass = ''
  export { klass as class }
  export let insight

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
  } = insight

  const seoLink = getSEOLinkFromIdAndTitle(id, title)
  const { MMM, DD, YYYY } = getDateFormats(new Date(publishedAt || updatedAt))
  const status =
    state === AWAITING_APPROVAL_STATE
      ? 'Awaiting approval'
      : `${MMM} ${DD}, ${YYYY}`
</script>

<template lang="pug">
include /ui/mixins

.top
  div
    Tags({tags})
  a.title(href="/read/{seoLink}")
    MultilineText(maxLines='{2}') {title}

.bottom
  .bottom__left
    ProfileInfo(name="{user.username}", id="{user.id}", status="{status}")
  LikeBtn({id}, liked='{!!votedAt}', likes='{votes.totalVotes}')

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .top {
    flex: 1;
  }

  .title {
    @include text('h4', 'm');
    margin-top: 14px;
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
</style>

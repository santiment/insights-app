<script>
  import ProfileInfo from '@/components/ProfileInfo'
  import RocketMoonBtn from '@/components/RocketMoonBtn'
  import CommentCounter from '@/components/comments/Counter'
  import MultilineText from '@/components/MultilineText'
  import Badge from '@/components/Badge'
  import Tag from '@/components/insights/Tag'
  import Tags from './Tags.svelte'
  import { getDateFormats } from '@/utils/dates'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'

  export let insight,
    transformLink = (link) => link

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
    isPaywallRequired,
  } = insight

  const AWAITING_APPROVAL_STATE = 'awaiting_approval'
  const seoLink = getSEOLinkFromIdAndTitle(id, title)
  const { MMM, DD, YYYY } = getDateFormats(new Date(publishedAt || updatedAt))
  const status =
    state === AWAITING_APPROVAL_STATE
      ? 'Awaiting approval'
      : `${MMM} ${DD}, ${YYYY}`

  const link = transformLink(`/read/${seoLink}`)
</script>

<template lang="pug">
include /ui/mixins

.top
  a.title(href="{link}")
    MultilineText(maxLines='{2}') {title}
  .authorInfo
    ProfileInfo(name="{user.username}", id="{user.id}", avatarUrl="{user.avatarUrl}", status="{status}",
    withPic, classes="{{wrapper: 'card__profile'}}")
    Badge(id="{user.id}")

.bottom
  .stats
    RocketMoonBtn({id}, votes='{votes.totalVotes}', userVotes='{votes.currentUserVotes}')
    CommentCounter.Card__comments({link}, {commentsCount}, isSSRLink)

  div.tags
    Tags({tags})
  +if('isPaywallRequired')
    +icon('crown').paywalled

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
    padding: 18px 16px 16px 24px;
  }

  .title {
    @include text('body-1');
    display: block;
    word-break: break-word;
    margin-bottom: 14px;

    &:hover {
      color: var(--green);
    }
  }

  .authorInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bottom {
    display: flex;
    align-items: center;
    padding: 12px 16px 12px 24px;
  }

  .stats {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin-right: 20px;
  }

  .tags {
    margin-left: auto;
    text-align: right;
  }

  .paywalled {
    @include size(12px, 9px);
    fill: var(--orange);
    margin-left: 20px;
  }

  :global(.Card__comments) {
    margin-left: 10px;
  }

  :global(.card__profile) {
    max-width: 400px;
  }
</style>

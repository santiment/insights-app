<script>
  import LikeBtn from '@/components/LikeBtn'
  import CommentCounter from '@/components/comments/Counter'
  import MultilineText from '@/components/MultilineText'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'

  let klass = ''
  export { klass as class }
  export let insight

  let { id, user, title, votes, votedAt, commentsCount = 0 } = insight

  const seoLink = getSEOLinkFromIdAndTitle(id, title)
  const link = `/read/${seoLink}`
</script>

<template lang="pug">
include /ui/mixins

a.title(href="{link}")
  MultilineText(maxLines='{3}') {title}

.bottom
  a.user(href='/user/{user.id}') {user.username}
  .right
    LikeBtn({id}, liked='{!!votedAt}', likes='{votes.totalVotes}')
    CommentCounter.Card__comments({link}, {commentsCount}, isSSRLink)

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .user {
    color: var(--waterloo);
    max-width: calc(70% - 40px);
    flex: 1;
    text-overflow: ellipsis;
    overflow-x: hidden;

    &:hover {
      color: var(--jungle-green);
    }
  }

  .title {
    @include text('body-2');
    margin: 0 0 6px;
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
  }

  :global(.Card__comments) {
    margin-left: 22px;
  }
</style>

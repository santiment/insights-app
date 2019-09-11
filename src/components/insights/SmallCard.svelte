<script>
  import LikeBtn from '@/components/LikeBtn'
  import MultilineText from '@/components/MultilineText'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'

  let klass = ''
  export { klass as class }
  export let insight

  let { id, user, title, votes, votedAt } = insight

  const seoLink = getSEOLinkFromIdAndTitle(id, title)
</script>

<template lang="pug">
include /ui/mixins

a.title(href="/read/{seoLink}")
  MultilineText(maxLines='{3}') {title}

.bottom
  a.user(href='/users/{user.id}') {user.username}
  LikeBtn({id}, liked='{!!votedAt}', likes='{votes.totalVotes}')

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .user {
    color: var(--waterloo);
    max-width: calc(70% - 40px);
    flex: 1;

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
</style>

<script>
  import LikeBtn from '@/components/LikeBtn'
  import ShareBtn from '@/components/sharing/ShareBtn'
  import CommentCounter from '@/components/comments/Counter'

  export let id,
    readyState,
    liked,
    votes,
    shareLink,
    commentsCount,
    hidden,
    isAuthor
</script>

<template lang="pug">
include /ui/mixins

.wrapper(class:hidden)
  +if('readyState !== "draft"')
    LikeBtn({id}, bind:liked, likes='{votes.totalVotes}')
    CommentCounter.FixedControls__comments({commentsCount})
    ShareBtn.FixedControls__share(link='{shareLink}')
  +if('isAuthor')
    a.edit(href='/edit/{id}')
      +icon('edit').edit__icon
</template>

<style lang="scss">
  @import '@/mixins';

  .wrapper {
    position: fixed;
    top: 200px;
    flex-direction: column;
    display: flex;
    align-items: start;
    right: calc(50% + 440px);
    transition: opacity 150ms ease-in;
    opacity: 1;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }

  :global(.FixedControls__comments) {
    margin: 16px 0;
  }

  :global(.FixedControls__share) {
    fill: var(--casper);
    margin-top: 3px;
  }

  .edit {
    margin: 20px 0 0;
  }

  .edit__icon {
    @include size(16px);
    cursor: pointer;

    &:hover {
      fill: var(--jungle-green);
    }
  }
</style>

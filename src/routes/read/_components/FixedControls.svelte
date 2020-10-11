<script>
  import RocketMoonBtn from '@/components/RocketMoonBtn'
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
    RocketMoonBtn.FixedControls__action({id}, bind:liked, likes='{votes.totalVotes}', moonClass='moonClass')
    CommentCounter.FixedControls__comments.FixedControls__action({commentsCount})
    ShareBtn.FixedControls__share.FixedControls__action(link='{shareLink}')
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
    margin: 8px 0;
  }

  :global(.FixedControls__share) {
    fill: var(--casper);
  }

  :global(.FixedControls__action) {
    border-radius: 100px !important;
    padding: 8px 12px !important;
    height: 32px !important;
    border: 1px solid var(--porcelain);
    margin-right: 10px;
    display: flex;
    align-items: center;
    max-width: 90px;

    &:first-child {
      max-width: 180px;
      padding: 8px 8px 8px 7px !important;
    }
  }

  :global(.moonClass) {
    box-shadow: none !important;
    border: none !important;
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

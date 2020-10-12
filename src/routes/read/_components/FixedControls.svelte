<script>
  import RocketMoonBtn from '@/components/RocketMoonBtn'
  import ShareBtn from '@/components/sharing/ShareBtn'
  import CommentCounter from '@/components/comments/Counter'

  export let id,
    readyState,
    votes,
    currentVoting,
    shareLink,
    commentsCount,
    hidden,
    isAuthor
</script>

<template lang="pug">
include /ui/mixins

.wrapper(class:hidden)
  +if('readyState !== "draft"')
    RocketMoonBtn({id}, votes='{votes.totalVotes}', userVotes='{votes.currentUserVotes}' moonClass='moonClass', bind:currentVoting)
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
    margin: 8px 0;
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

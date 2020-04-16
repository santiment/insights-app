<script>
  import LikeBtn from '@/components/LikeBtn'
  import ShareBtn from '@/components/sharing/ShareBtn'
  import CommentCounter from '@/components/comments/Counter'
  import { getShareLink } from '@/logic/share'

  export let id, readyState, isAuthor, votes, liked, commentsCount

  $: link = getShareLink(id)
</script>

<template lang="pug">
include /ui/mixins

h2 Thanks for reading!
p If you enjoyed this insight please leave a like, join discussion in the comments and share it with your friends!

.actions
  +if('readyState !== "draft"')
    LikeBtn.Thanks__action.Thanks__like({id}, bind:liked, likes='{votes.totalVotes}')
    CommentCounter.Thanks__action({commentsCount})
    ShareBtn.Thanks__action.Thanks__share({link})

  +if('isAuthor')
    a.Thanks__action.edit(href='/edit/{id}')
      +icon('edit').edit__icon
</template>

<style lang="scss">
  @import '@/mixins';

  h2,
  p {
    text-align: center;
  }

  h2 {
    @include text('h4', 'm');
    margin: 20px 0 0;
  }

  p {
    @include text('body-2');
    color: var(--waterloo);
    max-width: 460px;
    margin: 14px auto 28px;
  }

  .actions {
    display: flex;
    justify-content: center;
  }

  .edit {
    fill: var(--casper);

    &:hover {
      fill: var(--jungle-green);
    }

    &__icon {
      @include size(15px);
    }
  }

  :global(.Thanks__action) {
    padding: 9px 16px !important;
    height: 40px !important;
    border: 1px solid var(--mystic) !important;
    border-radius: 4px;
    margin-right: 8px;

    &:last-child {
      margin: 0;
    }
  }

  :global(.Thanks__like.liked) {
    border-color: var(--persimmon) !important;
  }

  :global(.Thanks__share) {
    fill: var(--casper);
  }
</style>

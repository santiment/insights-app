<script>
  import RocketMoonBtn from '@/components/RocketMoonBtn'
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
    RocketMoonBtn.Thanks__action({id}, votes='{votes.totalVotes}', userVotes='{votes.currentUserVotes}')
    CommentCounter.Thanks__action({commentsCount})
    ShareBtn.Thanks__action({link})

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
    margin-right: 10px;

    &:last-child {
      margin: 0;
    }
  }
</style>

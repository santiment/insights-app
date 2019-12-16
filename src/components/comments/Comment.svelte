<script>
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import Dialog from '@/ui/dialog/index'
  import ContextMenu from '@/components/ContextMenu'
  import CommentAuthor from './Author.svelte'
  import CommentReply from './ReplyBtn.svelte'
  import CommentEditBtn from './EditBtn.svelte'
  import CommentDeleteBtn from './DeleteBtn.svelte'
  import { dateDifferenceInWords } from '@/utils/dates'

  export let comments,
    insightId,
    comment,
    subComments,
    level = 0

  let open = false
  let loading = false
  let id, content, dateDiff
  let userId, avatarUrl, email, username

  $: {
    id = comment.id
    content = comment.content
    dateDiff = dateDifferenceInWords({
      from: new Date(comment.insertedAt),
      to: new Date(),
    })

    const user = comment.user
    userId = user.id
    avatarUrl = user.avatarUrl
    email = user.email
    username = user.username
  }

  const { session } = stores()
</script>

<template lang="pug">
include /ui/mixins

.comment(style='--level: {level}')
  .author
    CommentAuthor({avatarUrl}, username='{username || email}')
    | {dateDiff}
  .body
    // .rating
      // +icon('arrow-down').icon-arrow.icon-arrow_up
      // |+23
      // +icon('arrow-down').icon-arrow
    .text
      p {content}
      .actions
        CommentReply({id}, {insightId}, bind:comments)
        +if('$session.currentUser && $session.currentUser.id === userId')
          ContextMenu(align='end', activeClass='Comment__more')
            +button.action(slot='trigger')
              +icon('dots').icon-dots
            .menu(slot='content')
              CommentEditBtn({id}, {content}, bind:comment)
              CommentDeleteBtn({id}, bind:comment)


+if('subComments[id]')
  +each('subComments[id] as subComment (subComment.id)')
    svelte:self({insightId}, comment='{subComment}', {subComments}, level='{level + 1}')

</template>

<style lang="scss">
  @import '@/mixins';

  .comment {
    margin-bottom: 16px;
    margin-left: calc(52px * var(--level));
  }

  .icon-arrow {
    @include size(8px, 5px);
    padding: 5px;
    cursor: pointer;
    border-radius: 2px;
    fill: var(--casper);
    margin: 2px 0;

    &_up {
      transform: rotate(180deg);
    }

    &:hover {
      background: var(--athens);
    }
  }

  .icon-dots {
    @include size(16px, 4px);
  }

  .author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--waterloo);
    @include text('caption');
  }

  .body {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 16px;
    color: var(--waterloo);
  }

  .text {
    flex: 1;
  }

  p {
    border-radius: 4px;
    background: var(--athens);
    padding: 16px;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }

  .action {
    fill: var(--waterloo);

    &:hover {
      fill: var(--jungle-green-hover);
    }
  }

  .menu {
    padding: 8px;
  }

  :global(.Comment__more) {
    background: var(--jungle-green-light) !important;
    fill: var(--jungle-green) !important;
  }
</style>

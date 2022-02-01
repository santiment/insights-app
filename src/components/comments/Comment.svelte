<script>
  import { stores } from '@sapper/app'
  import Dialog from '@/ui/dialog/index'
  import ContextMenu from '@/components/ContextMenu'
  import CommentAuthor from './Author.svelte'
  import CommentReply from './ReplyBtn.svelte'
  import CommentEditBtn from './EditBtn.svelte'
  import CommentDeleteBtn from './DeleteBtn.svelte'
  import { dateDifferenceInWords } from '@/utils/dates'

  export let comments,
    insightId,
    insightAuthorId,
    comment,
    subComments,
    level = 0

  let open = false
  let loading = false
  let id,
    content,
    dateDiff,
    datePrefix = ''
  let userId, avatarUrl, email, username

  const { session } = stores()
  const DELETE_MSG = 'The comment has been deleted.'

  $: {
    id = comment.id
    content = comment.content
    datePrefix = comment.editedAt ? 'Edited ' : ''
    dateDiff = dateDifferenceInWords({
      from: new Date(comment.editedAt || comment.insertedAt),
      to: new Date(),
    })

    const user = comment.user
    userId = user.id
    avatarUrl = user.avatarUrl
    email = user.email
    username = user.username
  }
</script>

<template lang="pug">
include /ui/mixins

.comment(style='--level: {level}')
  .author
    CommentAuthor({avatarUrl}, username='{username || email}', id='{userId}', {insightAuthorId})
    | {datePrefix}{dateDiff}
  .body
    // .rating
      // +icon('arrow-down').icon-arrow.icon-arrow_up
      // |+23
      // +icon('arrow-down').icon-arrow
    .text
      p {content}
      .actions
        +if('content !== DELETE_MSG')
          CommentReply({id}, {insightId}, bind:comments)
        +if('$session.currentUser && $session.currentUser.id === userId')
          ContextMenu(align='end', activeClass='Comment__more', bind:open)
            +button.action(slot='trigger')
              +icon('dots').icon-dots
            .menu(slot='content')
              CommentEditBtn({id}, {content}, bind:comment, bind:isContextOpened='{open}')
              CommentDeleteBtn({id}, bind:comment, bind:isContextOpened='{open}')


+if('subComments[id]')
  +each('subComments[id] as subComment (subComment.id)')
    svelte:self({insightId}, comment='{subComment}', {subComments}, level='{level + 1}', {insightAuthorId}, bind:comments)

</template>

<style lang="scss">
  @import '@/mixins';

  .comment {
    margin-bottom: 16px;
    margin-left: calc(52px * var(--level));
  }

  /*
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
 */

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

  /*
 .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 16px;
    color: var(--waterloo);
  }
  */
  .text {
    flex: 1;
  }

  p {
    border-radius: 4px;
    background: var(--athens);
    padding: 16px;
    white-space: pre-line;
    word-break: break-word;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }

  .action {
    fill: var(--waterloo);

    &:hover {
      fill: var(--green-hover);
    }
  }

  .menu {
    padding: 8px;
  }

  :global(.Comment__more) {
    background: var(--green-light-1) !important;
    fill: var(--green) !important;
  }
</style>

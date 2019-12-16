<script>
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import Dialog from '@/ui/dialog/index'
  import ContextMenu from '@/components/ContextMenu'
  import CommentAuthor from './Author.svelte'
  import CommentEditBtn from './EditBtn.svelte'
  import CommentDeleteBtn from './DeleteBtn.svelte'
  import { dateDifferenceInWords } from '@/utils/dates'
  import { CREATE_COMMENT_MUTATION } from '@/gql/comments'

  const { session } = stores()
  export let insightId,
    comment,
    subComments,
    level = 0

  let open = false
  let loading = false

  const {
    id,
    content,
    insertedAt,
    user: { id: userId, avatarUrl, email, username },
  } = comment

  const dateDiff = {
    from: new Date(insertedAt),
    to: new Date(),
  }

  function onSubmit(e) {
    e.preventDefault()
    const {
      reply: { value: content },
    } = e.currentTarget

    if (loading || !content) {
      return
    }

    loading = true

    client
      .mutate({
        mutation: CREATE_COMMENT_MUTATION,
        variables: {
          id: +insightId,
          parentId: +id,
          content,
        },
      })
      .then(() => {
        open = false
        loading = false
      })
  }
</script>

<template lang="pug">
include /ui/mixins

.comment(style='--level: {level}')
  .author
    CommentAuthor({avatarUrl}, username='{username || email}')
    | {dateDifferenceInWords(dateDiff)}
  .body
    // .rating
      // +icon('arrow-down').icon-arrow.icon-arrow_up
      // |+23
      // +icon('arrow-down').icon-arrow
    .text
      p {content}
      .actions
        Dialog(title='Replying', bind:open)
          +button(slot='trigger') Reply
          form(slot='content', on:submit='{onSubmit}')
            textarea(required, name='reply')
            +dialogActions
              +button(type='cancel', border) Cancel
              +button(type='submit', variant='fill', accent='jungle-green', class:loading) Submit reply
        +if('$session.currentUser && $session.currentUser.id === userId')
          ContextMenu(align='end', activeClass='Comment__more')
            +button(slot='trigger')
              +icon('dots').icon-dots
            .menu(slot='content')
              CommentEditBtn({id}, {content})
              CommentDeleteBtn({id})


+if('subComments[id]')
  +each('subComments[id] as subComment')
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

    & > button {
      cursor: pointer;
      color: var(--waterloo);
      fill: var(--waterloo);

      &:hover {
        color: var(--jungle-green-hover);
        fill: var(--jungle-green-hover);
      }
    }
  }

  textarea {
    border-radius: 4px;
    outline: none;
    border: 1px solid var(--porcelain);
    background: var(--white);
    width: 400px;
    margin: 20px 20px 14px;
    padding: 9px 12px;

    &::placeholder {
      color: var(--casper);
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

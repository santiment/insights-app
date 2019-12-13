<script>
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import Dialog from '@/ui/dialog/index'
  import Tooltip from '@/components/Tooltip'
  import DeleteBtn from './DeleteBtn.svelte'
  import { dateDifferenceInWords } from '@/utils/dates'
  import {
    CREATE_COMMENT_MUTATION,
    DELETE_COMMENT_MUTATION,
    UPDATE_COMMENT_MUTATION,
  } from '@/gql/comments'

  const { session } = stores()
  export let insightId,
    comment,
    subComments,
    level = 0

  let open = false
  let loading = false
  let isUpdateOpened = false

  const {
    id,
    content,
    insertedAt,
    user: { id: userId, username, avatarUrl },
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

  function onUpdateSubmit({ currentTarget: { update } }) {
    const content = update.value

    client
      .mutate({
        mutation: UPDATE_COMMENT_MUTATION,
        variables: {
          id: +id,
          content,
        },
      })
      .then(() => {
        isUpdateOpened = false
        loading = false
      })
  }
</script>

<template lang="pug">
include /ui/mixins

.comment(style='--level: {level}')
  .author
    .profile
      .pic
        img(src!='{avatarUrl || "profile-fallback.svg"}', alt="Profile pic")
      h4 {username}
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
          Tooltip(closeTimeout='{15000}')
            +button(slot='trigger')
              +icon('dots').icon-dots
            .menu(slot='content')
              Dialog(title='Update comment', bind:open='{isUpdateOpened}')
                +button(slot='trigger', variant='ghost', fluid) Edit
                form(slot='content', on:submit|preventDefault='{onUpdateSubmit}')
                  textarea(required, name='update', value='{content}')
                  +dialogActions
                    +button(type='cancel', border) Cancel
                    +button(type='submit', variant='fill', accent='jungle-green', class:loading) Update comment
              DeleteBtn({id})


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

  .profile {
    display: flex;
    align-items: center;
    max-width: 71%;
  }

  .author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--waterloo);
    @include text('caption');
  }

  .pic {
    @include size(40px);
    border-radius: 50%;
    background: var(--porcelain);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    min-width: 22px;
  }

  h4 {
    @include text('body-2');
    margin-left: 12px;
    color: var(--mirage);
    max-width: 100%;
    text-overflow: ellipsis;
    overflow-x: hidden;
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
</style>

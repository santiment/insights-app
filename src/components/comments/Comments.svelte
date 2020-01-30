<script>
  import { get } from 'svelte/store'
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import Comment from '@/components/comments/Comment'
  import CommentInput from '@/components/comments/Input'
  import CommentForm from '@/components/comments/Form'
  import CommentAuthor from '@/components/comments/Author'
  import { getComments, createComment } from '@/logic/comments'

  const { session } = stores()
  const classes = {
    form: 'Comments__form',
    input: 'Comments__input',
  }

  export let id,
    authorId,
    comments,
    commentsCount = 0,
    hasMore = false

  let avatarUrl = ''
  let username = ''
  let userId
  let loading

  $: subComments = comments.reduce((acc, comment) => {
    const { parentId } = comment
    if (parentId) {
      const comments = acc[parentId]
      if (comments) {
        comments.push(comment)
      } else {
        acc[parentId] = [comment]
      }
    }

    return acc
  }, {})

  $: if ($session.currentUser) {
    const { currentUser } = $session
    avatarUrl = currentUser.avatarUrl
    username = currentUser.username || currentUser.email
    userId = currentUser.id
  }

  function onMoreClick() {
    const { insertedAt } = comments[comments.length - 1]
    getComments(id, {
      type: 'AFTER',
      datetime: insertedAt,
    }).then(({ data }) => {
      comments = comments.concat(data.comments)
      hasMore = data.comments.length === 10
    })
  }

  function postComment({ detail: { content, form } }) {
    if (!content || loading) {
      return
    }

    loading = true
    form.blur()

    createComment(id, content)
      .then(
        ({
          data: {
            createComment: { id: newId },
          },
        }) => {
          loading = false
          form.reset()
          comments = [
            ...comments,
            {
              id: newId,
              content,
              parentId: null,
              insertedAt: new Date().toISOString(),
              user: { ...get(session).currentUser },
            },
          ]
        },
      )
      .catch(console.warn)
  }

  function onlyRootCommentsFilter({ parentId }) {
    return parentId === null
  }
</script>

<template lang="pug">
include /ui/mixins

section
  +if('$session.currentUser || comments.length !== 0')
    h2 Comments 
      span ({commentsCount})

  +if('$session.currentUser')
    CommentAuthor({avatarUrl}, {username}, id='{userId}', insightAuthorId='{authorId}')

    CommentForm(on:submit='{postComment}', {classes})
      +button.submit(slot='after', variant='fill', accent='jungle-green', type='submit', class:loading) Post

  .comments
    +each('comments.filter(onlyRootCommentsFilter) as comment (comment.id)')
      Comment(insightId='{id}', insightAuthorId='{authorId}', bind:comments, {comment}, {subComments})

  +if('hasMore')
    +button.more(fluid, border, on:click='{onMoreClick}') Show more comments
</template>

<style lang="scss">
  @import '@/mixins';

  h2 {
    @include text('h4');
    margin-bottom: 30px;
  }

  span {
    color: var(--waterloo);
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

  section {
    max-width: 720px;
    margin: 40px auto;
  }

  .author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--waterloo);
    @include text('caption');
  }

  :global(.Comments__form) {
    display: flex;
    margin-top: 16px;
  }

  :global(.Comments__input) {
    margin-right: 16px;
    flex: 1;
  }

  .submit {
    height: 40px;
    min-width: 92px;
    justify-content: center;
  }

  .comments {
    margin-top: 30px;
  }

  .more {
    margin-top: 20px;
    justify-content: center;
    color: var(--waterloo);

    &:hover {
      color: var(--jungle-green-hover);
    }
  }
</style>

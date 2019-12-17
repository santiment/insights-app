<script>
  import { get } from 'svelte/store'
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import Comment from '@/components/comments/Comment'
  import CommentInput from '@/components/comments/Input'
  import CommentAuthor from '@/components/comments/Author'
  import {
    COMMENTS_FOR_INSIGHT_QUERY,
    CREATE_COMMENT_MUTATION,
  } from '@/gql/comments'

  const { session } = stores()
  export let id, authorId

  let comments = []
  let subComments = {}
  let hasMore = false
  let avatarUrl = ''
  let username = ''
  let userId
  let loading

  $: if (id) {
    getComments().then(({ data }) => {
      comments = data.comments
      hasMore = data.comments.length === 10
    })
  }

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

  function getComments(cursor) {
    return client.query({
      query: COMMENTS_FOR_INSIGHT_QUERY,
      variables: {
        id,
        cursor,
      },
    })
  }

  function onMoreClick() {
    const { insertedAt } = comments[comments.length - 1]
    getComments({
      type: 'AFTER',
      datetime: insertedAt,
    }).then(({ data }) => {
      comments = comments.concat(data.comments)
      hasMore = data.comments.length === 10
    })
  }

  function postComment({ currentTarget }) {
    const {
      comment: { value: content },
    } = currentTarget

    if (!content || loading) {
      return
    }

    loading = true
    currentTarget.blur()

    client
      .mutate({
        mutation: CREATE_COMMENT_MUTATION,
        variables: {
          id: +id,
          content,
        },
      })
      .then(
        ({
          data: {
            createComment: { id: newId },
          },
        }) => {
          loading = false
          currentTarget.reset()
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

  function onKeyPress({ currentTarget, code, ctrlKey }) {
    if (ctrlKey && code === 'Enter') {
      postComment({ currentTarget })
    }
  }
</script>

<template lang="pug">
include /ui/mixins

section
  +if('$session.currentUser || comments.length !== 0')
    h2 Comments

  +if('$session.currentUser')
    CommentAuthor({avatarUrl}, {username}, id='{userId}', insightAuthorId='{authorId}')

    form(on:submit|preventDefault='{postComment}', on:keypress='{onKeyPress}')
      CommentInput.Comments__input
      +button.submit(variant='fill', accent='jungle-green', type='submit', class:loading) Post

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

  form {
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

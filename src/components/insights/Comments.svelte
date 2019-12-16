<script>
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import Comment from '@/components/comments/Comment'
  import CommentAuthor from '@/components/comments/Author'
  import {
    COMMENTS_FOR_INSIGHT_QUERY,
    CREATE_COMMENT_MUTATION,
  } from '@/gql/comments'

  const { session } = stores()
  export let id

  let comments = []
  let subComments = {}
  let hasMore = false
  let avatarUrl = ''
  let username = ''

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

  function postComment(e) {
    e.preventDefault()
    const {
      comment: { value: content },
    } = e.currentTarget

    if (!content) {
      return
    }

    client
      .mutate({
        mutation: CREATE_COMMENT_MUTATION,
        variables: {
          id: +id,
          content,
        },
      })
      .then(console.log)
  }

  function onlyRootCommentsFilter({ parentId }) {
    return parentId === null
  }
</script>

<template lang="pug">
include /ui/mixins

section
  +if('$session.currentUser')
    CommentAuthor({avatarUrl}, {username})

    form(on:submit='{postComment}')
      textarea(required, name='comment', placeholder='Type your comment here')
      +button.submit(variant='fill', accent='jungle-green', type='submit') Post

  .comments
    +each('comments.filter(onlyRootCommentsFilter) as comment')
      Comment(insightId='{id}', {comment}, {subComments})

  +if('hasMore')
    +button.more(fluid, border, on:click='{onMoreClick}') Show more comments
</template>

<style lang="scss">
  @import '@/mixins';

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

  textarea {
    border-radius: 4px;
    border: 1px solid var(--porcelain);
    background: var(--white);
    margin-right: 16px;
    flex: 1;
    min-height: 40px;
    height: 40px;
    padding: 9px 12px;
    outline: none;

    &::placeholder {
      color: var(--casper);
    }
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

<script>
  import { getContext } from 'svelte'
  import Comments from '@/components/comments/Comments'
  import {
    getComments,
    createComment as unwrappedCreateComment,
    deleteComment,
    editComment,
  } from '@/logic/comments'
  import { saveComment, clearSavedComment } from '@/utils/comments'

  export let id, authorId, comments

  const commentsCount = getContext('commentsCount')

  let hasMore = false

  $: if (process.browser && id) {
    if (location.hash === '#comments') {
      setTimeout(() => {
        document.querySelector('#comments').scrollIntoView()
      }, 70)
    }
  }

  $: if (id && !comments) {
    comments = []

    getComments(id).then(({ data }) => {
      comments = data.comments
      hasMore = data.comments.length === 10
    })
  }

  function createComment(...args) {
    return unwrappedCreateComment(...args).then((res) => {
      $commentsCount += 1
      return res
    })
  }
</script>

<template lang="pug">
Comments({comments}, {id}, {authorId}, {getComments}, {createComment}, {deleteComment}, {editComment}, commentsCount='{$commentsCount}', {saveComment}, {clearSavedComment}, bind:hasMore)
</template>

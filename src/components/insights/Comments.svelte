<script>
  import Comments from '@/components/comments/Comments'
  import {
    getComments,
    createComment,
    deleteComment,
    editComment,
  } from '@/logic/comments'

  export let id,
    authorId,
    commentsCount = 0,
    comments

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
</script>

<template lang="pug">
Comments({comments}, {commentsCount}, {id}, {authorId}, bind:hasMore, {getComments}, {createComment}, {deleteComment}, {editComment})
</template>

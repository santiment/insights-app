<script>
  import { client } from '@/apollo'
  import Dialog from '@/ui/dialog/index'
  import { DELETE_COMMENT_MUTATION } from '@/gql/comments'

  export let id

  let open = false
  let loading = false

  function deleteComment(e) {
    loading = true

    client
      .mutate({
        mutation: DELETE_COMMENT_MUTATION,
        variables: {
          id: +id,
        },
      })
      .then(() => {
        open = false
        loading = false
      })
  }

  function closeDialog() {
    open = false
  }
</script>

<template lang="pug">
include /ui/mixins

Dialog(title='Delete comment?', bind:open)
  +button(slot='trigger', variant='ghost', fluid) Delete
  div(slot='content')
    .delete Are you sure you want to delete this comment?
    +dialogActions
      +button()(on:click='{closeDialog}', border) Cancel
      +button(variant='fill', accent='jungle-green', on:click='{deleteComment}') Delete comment
</template>

<style>
  .delete {
    margin: 20px 20px 14px;
  }
</style>

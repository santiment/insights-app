<script>
  import { getContext } from 'svelte'
  import Dialog from '@/ui/dialog/index'

  const deleteComment = getContext('deleteComment')

  export let id, comment, isContextOpened

  let open = false
  let loading = false

  $: if (!open) {
    isContextOpened = false
  }

  function onDeleteClick() {
    loading = true

    deleteComment(id)
      .then(closeDialog)
      .then(() => {
        comment.content = 'The comment has been deleted.'
        comment.user = {
          id: 0,
          avatarUrl: null,
          email: 'anonymous@santiment.net',
          username: 'anonymous',
        }
      })
      .catch(console.warn)
  }

  function closeContextMenu() {
    isContextOpened = false
  }

  function closeDialog() {
    open = false
    closeContextMenu()
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
      +button(variant='fill', accent='jungle-green', on:click='{onDeleteClick}') Delete comment
</template>

<style>
  .delete {
    margin: 20px 20px 14px;
  }
</style>

<script>
  import { getContext, tick } from 'svelte'
  import CommentDialogForm from '@/components/comments/DialogForm'

  const classes = {
    input: 'EditBtn__input',
  }

  const editComment = getContext('editComment')

  export let id,
    content = '',
    comment,
    isContextOpened

  let open = false
  let loading = false

  function onSubmit({ detail: { content } }) {
    loading = true

    editComment(id, content)
      .then(() => {
        comment.content = content
        comment.editedAt = new Date().toISOString()
      })
      .then(closeDialog)
      .catch(console.warn)
  }

  function openDialog() {
    open = true
  }

  async function closeDialog() {
    open = false
    await tick()
    isContextOpened = false
  }
</script>

<template lang="pug">
include /ui/mixins

+button(variant='ghost', fluid, on:click='{openDialog}') Edit

CommentDialogForm({content}, title='Update comment', label='Update comment', on:submit='{onSubmit}', on:close='{closeDialog}', bind:loading, bind:open)
</template>

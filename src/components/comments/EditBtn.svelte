<script>
  import { tick } from 'svelte'
  import { client } from '@/apollo'
  import CommentDialogForm from '@/components/comments/DialogForm'
  import { UPDATE_COMMENT_MUTATION } from '@/gql/comments'

  const classes = {
    input: 'EditBtn__input',
  }

  export let id,
    content = '',
    comment,
    isContextOpened

  let open = false
  let loading = false

  function onSubmit({ detail: { content } }) {
    loading = true

    client
      .mutate({
        mutation: UPDATE_COMMENT_MUTATION,
        variables: {
          id: +id,
          content,
        },
      })
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

<script>
  import { getContext } from 'svelte'
  import { get } from 'svelte/store'
  import { stores, goto } from '@sapper/app'
  import CommentDialogForm from '@/components/comments/DialogForm'

  const createComment = getContext('createComment')

  export let id, insightId, comments

  let open = false
  let loading = false

  const { session } = stores()

  function onSubmit({ detail: { content } }) {
    if (loading || !content) {
      return
    }

    loading = true

    createComment(insightId, content, id).then(
      ({
        data: {
          createComment: { id: newId },
        },
      }) => {
        open = false
        loading = false

        comments = [
          ...comments,
          {
            id: newId,
            content,
            parentId: id,
            insertedAt: new Date().toISOString(),
            user: { ...get(session).currentUser },
          },
        ]
      },
    )
  }

  function checkLogin() {
    if (!get(session).currentUser) {
      return goto('/experience')
    }
    open = true
  }

  function closeDialog() {
    open = false
  }
</script>

<template lang="pug">
include /ui/mixins

+button.action(on:click='{checkLogin}') Reply

CommentDialogForm(title='Replying', label='Submit reply', on:submit='{onSubmit}', bind:loading, bind:open)
</template>

<style lang="scss">
  @import '@/mixins';

  .action {
    color: var(--waterloo);

    &:hover {
      color: var(--jungle-green-hover);
    }
  }
</style>

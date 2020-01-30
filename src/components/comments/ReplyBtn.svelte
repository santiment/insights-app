<script>
  import { get } from 'svelte/store'
  import { stores, goto } from '@sapper/app'
  import { client } from '@/apollo'
  import CommentDialogForm from '@/components/comments/DialogForm'
  import { CREATE_COMMENT_MUTATION } from '@/gql/comments'

  export let id, insightId, comments

  let open = false
  let loading = false

  const { session } = stores()

  function onSubmit({ detail: { content } }) {
    if (loading || !content) {
      return
    }

    loading = true

    client
      .mutate({
        mutation: CREATE_COMMENT_MUTATION,
        variables: {
          id: +insightId,
          parentId: +id,
          content,
        },
      })
      .then(
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

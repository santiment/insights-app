<script>
  import { get } from 'svelte/store'
  import { stores, goto } from '@sapper/app'
  import { client } from '@/apollo'
  import Dialog from '@/ui/dialog/index'
  import { CREATE_COMMENT_MUTATION } from '@/gql/comments'

  export let id, insightId, comments

  let open = false
  let loading = false

  const { session } = stores()

  function onSubmit({ currentTarget }) {
    const {
      reply: { value: content },
    } = currentTarget

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

Dialog(title='Replying', bind:open)
  form(slot='content', on:submit|preventDefault='{onSubmit}')
    textarea(required, name='reply', rows='5')
    +dialogActions
      +button(type='cancel', border, on:click='{closeDialog}') Cancel
      +button(type='submit', variant='fill', accent='jungle-green', class:loading) Submit reply

</template>

<style lang="scss">
  @import '@/mixins';

  .action {
    color: var(--waterloo);

    &:hover {
      color: var(--jungle-green-hover);
    }
  }

  textarea {
    border-radius: 4px;
    outline: none;
    border: 1px solid var(--porcelain);
    background: var(--white);
    width: 400px;
    margin: 20px 20px 14px;
    padding: 9px 12px;

    &::placeholder {
      color: var(--casper);
    }
  }
</style>

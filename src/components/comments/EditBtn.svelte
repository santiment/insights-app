<script>
  import { client } from '@/apollo'
  import Dialog from '@/ui/dialog/index'
  import { UPDATE_COMMENT_MUTATION } from '@/gql/comments'

  export let id,
    content = '',
    comment

  let open = false
  let loading = false

  function onSubmit({ currentTarget: { update } }) {
    const content = update.value

    client
      .mutate({
        mutation: UPDATE_COMMENT_MUTATION,
        variables: {
          id: +id,
          content,
        },
      })
      .then(() => {
        open = false
        loading = false

        comment.content = content
      })
      .catch(console.warn)
  }

  function closeDialog() {
    open = false
  }
</script>

<template lang="pug">
include /ui/mixins

Dialog(title='Update comment', bind:open)
  +button(slot='trigger', variant='ghost', fluid) Edit
  form(slot='content', on:submit|preventDefault='{onSubmit}')
    textarea(required, name='update', value='{content}')
    +dialogActions
      +button(type='cancel', border, on:click='{closeDialog}') Cancel
      +button(type='submit', variant='fill', accent='jungle-green', class:loading) Update comment
</template>

<style lang="scss">
  .delete {
    margin: 20px 20px 14px;
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

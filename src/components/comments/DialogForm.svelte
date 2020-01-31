<script>
  import Dialog from '@/ui/dialog/index'
  import CommentForm from '@/components/comments/Form'

  const classes = {
    input: 'DialogForm__input',
  }

  export let title,
    label,
    open,
    loading = false,
    content = ''

  function closeDialog() {
    open = false
  }
</script>

<template lang="pug">
include /ui/mixins

Dialog({title}, bind:open, on:close)
  div.content(slot='content')
    CommentForm({classes}, rows='5', value='{content}', on:submit)
      +dialogActions(slot='after', noPadding)
        +button(type='cancel', border, on:click='{closeDialog}') Cancel
        +button(type='submit', variant='fill', accent='jungle-green', class:loading) {label}
</template>

<style lang="scss">
  .content {
    margin: 20px;
  }

  :global(.DialogForm__input) {
    width: 400px;
    margin-bottom: 14px;
  }
</style>

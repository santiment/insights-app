<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let rows = 1,
    value = '',
    commentsCount = 0

  export let classes = {
    form: '',
    input: '',
  }

  $: placeholder =
    commentsCount === 0
      ? 'Be the first to comment...'
      : 'Type your comment here'

  function onInput({ currentTarget }) {
    if (rows > 1) {
      return
    }

    currentTarget.style.height = 'auto'
    currentTarget.style.minHeight = ''
    const res = currentTarget.scrollHeight + 2 + 'px'
    currentTarget.style.height = res
    currentTarget.style.minHeight = res
  }

  function onKeyPress({ currentTarget, code, ctrlKey }) {
    if (ctrlKey && code === 'Enter') {
      dispatch('submit', {
        content: extractComment(currentTarget),
        form: currentTarget,
      })
    }
  }

  function onSubmit({ currentTarget }) {
    dispatch('submit', {
      content: extractComment(currentTarget),
      form: currentTarget,
    })
  }

  function extractComment(form) {
    return form.comment.value
  }
</script>

<template lang="pug">
include /ui/mixins

form(on:submit|preventDefault='{onSubmit}', on:keypress='{onKeyPress}', class='{classes.form}')
  textarea({rows}, {value}, required, name='comment', {placeholder}, on:input='{onInput}', class='{classes.input}')
  slot(name='after')
</template>

<style lang="scss">
  @import '@/mixins';

  textarea {
    border-radius: 4px;
    border: 1px solid var(--porcelain);
    background: var(--white);
    min-height: 40px;
    padding: 9px 12px;
    outline: none;

    &::placeholder {
      color: var(--casper);
    }
  }
</style>

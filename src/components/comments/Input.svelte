<script>
  let klass = ''
  export { klass as class }

  function onInput({ currentTarget }) {
    currentTarget.style.height = 'auto'
    currentTarget.style.minHeight = ''
    const res = currentTarget.scrollHeight + 2 + 'px'
    currentTarget.style.height = res
    currentTarget.style.minHeight = res
  }
</script>

<template lang="pug">
include /ui/mixins

textarea(required, name='comment', placeholder='Type your comment here', on:input='{onInput}', class='{klass}', rows='1')
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

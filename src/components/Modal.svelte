<script>
  import { onMount, onDestroy } from 'svelte'
  export let open = false
  let klass = ''
  export { klass as class }

  let anc
  function closeDialog({ currentTarget, target }) {
    if (currentTarget === target) {
      open = false
    }
  }

  function onKeyup({ code }) {
    if (code === 'Escape') {
      open = false
    }
  }

  onMount(() => {
    const trigger = anc.nextElementSibling
    if (trigger) {
      trigger.onclick = () => (open = true)
    }
    window.addEventListener('keyup', onKeyup)
  })

  onDestroy(() => {
    if (process.browser) {
      window.removeEventListener('keyup', onKeyup)
    }
  })
</script>

<template lang="pug">
include /ui/mixins

p(bind:this='{anc}')

slot(name='trigger')

+if('open')
  .modal(on:click='{closeDialog}', class='{klass}')
    slot(name='content')
</template>

<style>
  p {
    display: none;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
    overflow: auto;
  }
</style>

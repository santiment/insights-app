<script>
  import { onMount, onDestroy } from 'svelte'
  export let title
  export let open = false

  let anc

  function closeDialog() {
    open = false
  }

  function onClickaway({ target, currentTarget }) {
    if (target === currentTarget) {
      closeDialog()
    }
  }

  function onKeyup({ code }) {
    if (code === 'Escape') {
      closeDialog()
    }
  }

  onMount(() => {
    anc.nextElementSibling.onclick = () => (open = true)
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
  .bg(on:click='{onClickaway}')
    +panel.dialog(variant='context')
      .top
        h2 {title}
        +icon('close')(on:click='{closeDialog}')
      slot(name='content')
</template>

<style lang="scss">
  @import '@/mixins';
  p {
    display: none;
  }

  .bg {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    max-width: 85%;
    max-height: 85%;
  }

  .top {
    @include text('body-2');
    border-bottom: 1px solid var(--porcelain);
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
  }

  svg {
    @include size(12px);
    fill: var(--waterloo);
    cursor: pointer;
    margin-left: 16px;

    &:hover {
      fill: var(--jungle-green);
    }
  }

  @include responsive('phone', 'phone-xs') {
    .dialog {
      max-width: 100%;
      max-height: 90%;
      transform: initial;
      left: 0;
      right: 0;
      bottom: 0;
      top: initial;
    }
  }
</style>

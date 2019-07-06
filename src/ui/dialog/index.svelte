<script>
  import { onMount } from 'svelte'
  export let title
  export let open = false

  let anc

  function closeDialog() {
    open = false
  }

  onMount(() => {
    anc.nextElementSibling.onclick = () => (open = true)
  })
</script>

<template lang="pug">
include /ui/mixins

p(bind:this='{anc}')

slot(name='trigger')

+if('open')
  +panel.dialog(variant='context')
    .top
      h2 {title}
      +icon('close')(on:click='{closeDialog}')
    slot(name='dialog')

  .bg(on:click='{closeDialog}')
</template>

<style lang="scss">
  @import '@/mixins';
  p {
    display: none;
  }

  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 10;
  }

  .bg {
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
  }

  .top {
    @include text('body-2');
    border-bottom: 1px solid var(--porcelain);
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    margin-bottom: 16px;
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
</style>

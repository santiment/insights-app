<script>
  import { stores } from '@sapper/app'
  const { preloading } = stores()

  function start(node) {
    setTimeout(() => {
      node.style.transform = 'translateX(-30%)'
    }, 0)
    return {}
  }

  function end(node) {
    node.classList.add('LoadProgress_loaded')
    return { duration: 800 }
  }
</script>

<template lang="pug">
.bar
  +if('$preloading')
    .loader(in:start, out:end)
</template>

<style>
  .bar {
    pointer-events: none;
    position: fixed;
    top: -1px;
    left: 0;
    right: 0;
    height: 4px;
  }

  .loader {
    height: 100%;
    background: var(--jungle-green);
    width: 100%;
    transform: translateX(-100%);
    transition: transform 3s cubic-bezier(0.4, 1, 1, 1);
    opacity: 0.8;
  }

  :global(.LoadProgress_loaded) {
    transition: transform 400ms cubic-bezier(0, 0, 0.4, 0) !important;
    transform: translateX(0) !important;
    animation: fade 250ms 350ms forwards;
  }

  @keyframes fade {
    0% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }
</style>

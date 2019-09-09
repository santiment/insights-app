<script>
  import { fade } from 'svelte/transition'

  export let trigger
  export let items
  export let offsetY = 10

  let lastTrigger
  let opened
  let style
  let clientHeight
  let clientWidth
  let firstTime
  let closeTimer

  const transition = { duration: 150 }
  let content

  $: {
    clientHeight
    clientWidth
    style = trigger && computeStyles()
  }

  $: if (trigger) {
    opened = true
    stopCloseTimer()
    trigger.onmouseleave = startCloseTimer
  }

  function startCloseTimer() {
    lastTrigger = trigger
    closeTimer = setTimeout(() => {
      lastTrigger = undefined
      opened = false
    }, 200)
  }

  function stopCloseTimer() {
    clearTimeout(closeTimer)
  }

  let innerWidth

  function computeStyles() {
    const {
      offsetTop,
      offsetHeight: triggerHeight,
      offsetWidth: triggerWidth,
    } = trigger
    const { left } = trigger.getBoundingClientRect()
    const halfDropdown = clientWidth / 2
    const halfTrigger = triggerWidth / 2
    const centered = halfDropdown - halfTrigger
    const leftPosition = left - centered

    let viewportAlign = 0
    if (leftPosition < 0) {
      viewportAlign = leftPosition
    } else if (leftPosition + clientWidth > innerWidth) {
      viewportAlign = leftPosition + clientWidth - innerWidth
    }

    return `left: ${leftPosition - viewportAlign}px; top: ${offsetY +
      offsetTop +
      triggerHeight}px; height: ${clientHeight}px; width: ${clientWidth}px`
  }
</script>

<template lang="pug">
include /ui/mixins

svelte:window(bind:innerWidth)

+if('opened')
  +panel.dd(variant="context", transition:fade="{transition}", {style}, class:dd_first="{!lastTrigger}" )
    +each('items as item')
     +if('item.id === trigger.id')
       .dd__content( transition:fade="{transition}", on:mouseenter="{stopCloseTimer}", on:mouseleave="{startCloseTimer}", bind:clientHeight, bind:clientWidth)
         svelte:component(this="{item.component}")
</template>

<style lang="scss">
  .dd {
    position: absolute;
    opacity: 1;
    z-index: 10;
    overflow: hidden;
    background: var(--white);
    animation-timing-function: ease !important;
    transition: left 200ms, top 200ms, height 200ms, width 200ms, opacity 150ms;
    box-sizing: content-box;

    &_first {
      transition: none;
    }

    &__content {
      position: absolute;
    }
  }
</style>

<script>
  import { fade } from 'svelte/transition'

  export let trigger
  export let items
  export let offsetY = 10

  const defaultSettings = {
    offsetY: 0,
    offsetX: 0,
    centered: true,
    activeClass: '',
  }

  let lastTrigger
  let opened
  let style
  let clientHeight
  let clientWidth
  let firstTime
  let closeTimer
  let innerWidth
  let content
  let triggerSettings = defaultSettings

  const transition = { duration: 150 }

  $: {
    clientHeight
    clientWidth
    style = trigger && computeStyles()
  }

  $: if (trigger) {
    triggerSettings = Object.assign({}, defaultSettings, trigger.dataset)
    hightLight()

    opened = true
    stopCloseTimer()
    trigger.onmouseleave = startCloseTimer
  }

  function hightLight() {
    const { activeClass } = triggerSettings

    if (lastTrigger === trigger) {
      return
    }

    if (lastTrigger) {
      const lastActiveClass = lastTrigger.dataset.activeClass
      if (lastActiveClass) {
        lastTrigger.classList.remove(lastActiveClass)
      }
    }

    if (activeClass) {
      trigger.classList.add(activeClass)
    }
  }

  function startCloseTimer() {
    lastTrigger = trigger
    closeTimer = setTimeout(closeDropdown, 200)
  }

  function closeDropdown() {
    const { activeClass } = triggerSettings
    if (activeClass) {
      trigger.classList.remove(activeClass)
    }
    lastTrigger = undefined
    opened = false
  }

  function stopCloseTimer() {
    clearTimeout(closeTimer)
  }

  function computeStyles() {
    const {
      offsetLeft,
      offsetTop,
      offsetHeight: triggerHeight,
      offsetWidth: triggerWidth,
    } = trigger

    const left = offsetLeft
    const absoluteLeft = trigger.getBoundingClientRect().left
    let centered = 0
    if (triggerSettings.centered) {
      if (triggerSettings.centered === 'window') {
        centered = absoluteLeft + (clientWidth - window.innerWidth) / 2
      } else {
        centered = (clientWidth - triggerWidth) / 2
      }
    }
    const leftPosition = left - centered
    const absoluteLeftPosition = absoluteLeft - centered

    let viewportAlign = 0
    if (absoluteLeftPosition < 0) {
      viewportAlign = absoluteLeftPosition
    } else {
      const rightAlignment = absoluteLeftPosition + clientWidth - innerWidth
      if (rightAlignment > 0) {
        viewportAlign = rightAlignment
      }
    }

    return `left: ${
      leftPosition - viewportAlign + +triggerSettings.offsetX
    }px; top: ${
      offsetY + offsetTop + +triggerSettings.offsetY + triggerHeight
    }px; height: ${clientHeight}px; width: ${clientWidth}px`
  }
</script>

<template lang="pug">
include /ui/mixins

svelte:window(bind:innerWidth)

+if('opened')
  +panel.dd(variant="context", transition:fade="{transition}", {style},
  class:dd_first="{!lastTrigger}")
    +each('items as item')
     +if('item.id === trigger.id')
       .dd__content(transition:fade="{transition}",
       on:mouseenter="{stopCloseTimer}",
       on:mouseleave="{startCloseTimer}", bind:clientHeight,
       bind:clientWidth, class!='{item.class || ""}')
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

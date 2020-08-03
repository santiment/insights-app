<script>
  import { onMount } from 'svelte'
  import {
    getSignByPosition,
    calculateAlignment,
    getTooltipStyles,
  } from '@/utils/positioning'

  let klass = ''
  export { klass as class }
  export let position = 'top'
  export let align = 'center'
  export let offsetY = 5
  export let offsetX = 5
  export let on = 'click'
  export let activeClass = ''

  export let open = false
  let modal
  let anc
  let trigger
  let tooltip

  $: if (modal) {
    modal.style.top = window.scrollY + 'px'
    document.body.appendChild(modal)
  }

  function openTooltip() {
    open = true
  }

  $: if (process.browser && trigger) {
    if (open) {
      trigger.classList.add(activeClass)
    } else {
      trigger.classList.remove(activeClass)
    }
  }

  $: if (tooltip) {
    const { left, top } = getTooltipStyles(
      tooltip,
      trigger,
      position,
      align,
      offsetX,
      offsetY,
    )

    tooltip.style.top = top + 'px'
    tooltip.style.left = left + 'px'
  }

  function onClickAway() {
    open = false
  }

  onMount(() => {
    trigger = anc.nextElementSibling
    trigger['on' + on] = openTooltip
  })
</script>

<template lang="pug">
include /ui/mixins

p(bind:this='{anc}')

slot(name='trigger')

+if('open')
  .modal(bind:this='{modal}')
    .clickaway(on:click='{onClickAway}')
    +panel.tooltip(variant='tooltip-small', bind:this='{tooltip}', class='{klass}')
      slot(name='content') 123
</template>

<style lang="scss">
  p {
    display: none;
  }

  .modal {
    position: absolute;
    left: 0;
    right: 0;
    height: 100vh;
  }

  .clickaway {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .tooltip {
    position: absolute;
    display: inline-block;
    max-width: 80%;
    max-height: 80%;
  }
</style>

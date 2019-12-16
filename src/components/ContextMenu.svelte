<script>
  import { onMount } from 'svelte'
  import {
    getSignByPosition,
    calculateAlignment,
    getTooltipStyles,
    isParentOf,
  } from '@/utils/positioning'

  let klass
  export { klass as class }
  export let position = 'top'
  export let align = 'center'
  export let offsetY = 5
  export let offsetX = 5
  export let on = 'click'
  export let activeClass = ''

  let modal
  let anc
  let trigger
  let tooltip
  let shown = false

  $: if (modal) {
    document.body.appendChild(modal)
  }

  function openTooltip() {
    shown = true
    trigger.classList.add(activeClass)
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

    const { scrollY, scrollX } = window
    tooltip.style.top = `${top + scrollY}px`
    tooltip.style.left = `${left + scrollX}px`
  }

  function onClickAway() {
    shown = false
    trigger.classList.remove(activeClass)
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

+if('shown')
  .modal(bind:this='{modal}')
    .clickaway(on:click='{onClickAway}')
    +panel.tooltip(variant='tooltip-small', bind:this='{tooltip}', class='{klass}')
      slot(name='content') 123
</template>

<style lang="scss">
  p {
    display: none;
  }

  .clickaway,
  .modal {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .clickaway {
    position: fixed;
  }

  .tooltip {
    position: absolute;
    display: inline-block;
    max-width: 80%;
    max-height: 80%;
  }
</style>

<script>
  import { onMount } from 'svelte'
  import { getSignByPosition, calculateAlignment } from '@/utils/positioning'

  let klass
  export { klass as class }
  export let position = 'top'
  export let align = 'center'
  export let closeTimeout = 150
  export let offsetY = 5
  export let offsetX = 5

  let anc
  let trigger
  let tooltip
  let shown = false
  let closeTimer
  let style

  function startCloseTimer() {
    closeTimer = setTimeout(() => (shown = false), closeTimeout)
  }

  function stopCloseTimer() {
    clearTimeout(closeTimer)
  }

  function openTooltip() {
    shown = true
    stopCloseTimer()
  }

  function getTooltipStyles(tooltip) {
    const {
      offsetLeft: tooltipLeft,
      offsetTop: tooltipTop,
      clientWidth: tooltipWidth,
      clientHeight: tooltipHeight,
    } = tooltip
    const {
      left: triggerLeft,
      top: triggerTop,
      width: triggerWidth,
      height: triggerHeight,
    } = trigger.getBoundingClientRect()

    const sign = getSignByPosition(position)
    let top = triggerTop
    let left = triggerLeft

    if (position === 'top' || position === 'bottom') {
      top +=
        (position === 'top' ? -tooltipHeight : triggerHeight) + sign * offsetY
      left += calculateAlignment(triggerWidth, tooltipWidth, align)
    } else {
      top += calculateAlignment(triggerHeight, tooltipHeight, align)
      left +=
        (position === 'left' ? -tooltipWidth : triggerWidth) + sign * offsetX
    }

    const { scrollY, scrollX } = window

    tooltip.style.top = `${top + scrollY}px`
    tooltip.style.left = `${left + scrollX}px`
  }

  onMount(() => {
    trigger = anc.nextElementSibling
    trigger.onmouseenter = openTooltip
    trigger.onmouseleave = startCloseTimer
  })

  $: {
    tooltip && getTooltipStyles(tooltip)
  }
</script>

<template lang="pug">
include /ui/mixins

p.Tooltip__anc(bind:this="{anc}")

slot(name='trigger')

+if('shown')
  +panel.tooltip(variant='tooltip-small', bind:this='{tooltip}', on:mouseenter='{stopCloseTimer}', on:mouseleave='{startCloseTimer}', class='{klass}', {style})
    slot(name='content') 123
</template>

<style lang="scss">
  :global(.Tooltip__anc) {
    display: none;
  }

  .tooltip {
    position: absolute;
    display: inline-block;
    max-width: 80%;
    max-height: 80%;
  }
</style>

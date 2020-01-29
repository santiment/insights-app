<script>
  import { cubicOut } from 'svelte/easing'
  import { onMount, onDestroy } from 'svelte'
  import { notifications } from '@/stores/notifications'
  import { flip } from 'svelte/animate'

  export let notification, i

  let { title, id, type = 'info', dismissAfter = 5000 } = notification

  function destroy() {
    clearTimeout(timer)
    notifications.remove(notification)
  }

  let timer
  let yOffset
  $: yOffset = `calc(-${i}00% - ${i}0px)`

  function notify(node) {
    return {
      duration: 300,
      css: t => {
        const eased = cubicOut(t)

        return `
  				transform: translate3d(${-130 + eased * 130}%, ${yOffset}, 0);
  				`
      },
    }
  }

  onMount(() => {
    timer = setTimeout(destroy, dismissAfter)
  })
  onDestroy(() => {
    clearTimeout(timer)
  })
</script>

<template lang="pug">
include /ui/mixins

+panel().not(on:click!="{() => notifications.remove(notification)}", variant='context', style='--y-offset: {yOffset}',transition:notify )
  +icon('{type}')(class='{type}')
  |{title}

</template>

<style lang="scss">
  @import '@/mixins';

  .not {
    font-weight: bold;
    padding: 15px 20px;
    position: absolute;
    transform: translateY(var(--y-offset));
    transition: transform 350ms;
    transition-delay: 200ms;
    left: 0;
    max-width: 70vw;
    white-space: nowrap;

    @include responsive('phone', 'phone-xs') {
      white-space: normal;
      max-width: initial;
      width: 100%;
      transform: translateY(calc(var(--y-offset) * -1));
    }
  }

  svg {
    @include size(15.5px);
    margin: -3px 16px 0 0;
  }

  .error {
    fill: var(--persimmon);
  }
  .info {
    fill: var(--dodger-blue);
  }
  .success {
    fill: var(--lima);
  }
  .warning {
    fill: var(--texas-rose);
  }
</style>

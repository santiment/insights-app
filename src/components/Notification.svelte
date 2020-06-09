<script>
  import { cubicOut } from 'svelte/easing'
  import { onMount, onDestroy } from 'svelte'
  import { notifications } from '@/stores/notifications'
  import { flip } from 'svelte/animate'

  export let notification, i

  let {
    title,
    id,
    type = 'info',
    dismissAfter = 5000,
    description,
    actions,
  } = notification
  let timer

  $: yOffset = `calc(-${i}00% - ${i}0px)`

  function destroy() {
    clearTimeout(timer)
    notifications.remove(notification)
  }

  function notify(node) {
    return {
      duration: 300,
      css: (t) => {
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

+panel().not(variant='context', style='--y-offset: {yOffset}',transition:notify )
  .top
    +icon('{type}').icon(class='{type}')
    |{title}
    +icon('close').close(on:click="{destroy}")
  +if('description')
    p {description}
  +if('actions')
    .actions
      +each('actions as {label, onClick, href}')
        +if('href')
          +button.action(accent='jungle-green', href='{href}') {label}
          +else()
            +button.action(accent='jungle-green', on:click='{onClick}') {label}



</template>

<style lang="scss">
  @import '@/mixins';

  .not {
    font-weight: bold;
    padding: 16px;
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

  .icon {
    @include size(15.5px);
    margin: -3px 16px 0 0;
  }

  .close {
    @include size(12px);
    fill: var(--casper);
    cursor: pointer;
    margin-left: 24px;

    &:hover {
      fill: var(--rhino);
    }
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

  .actions {
    margin: 10px 0 0 32px;
  }

  .action {
    height: auto;
    padding: 0;
  }

  p {
    padding: 10px 25px 0 31px;
    color: var(--waterloo);
    max-width: 100%;
    white-space: pre;
    overflow-x: auto;
  }
</style>

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
  onMount(() => {
    timer = setTimeout(destroy, dismissAfter)
  })

  onDestroy(() => {
    console.log('Destroying notification ->', notification)
  })

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
</script>

<template lang="pug">
include /ui/mixins

+panel.not()(on:click!="{() => notifications.remove(notification)}", variant='context', style='--y-offset: {yOffset}',transition:notify )
  +icon('{type}').icon
  | [{id}] {title}

</template>

<style lang="scss">
  @import '@/mixins';

  .not {
    padding: 15px 20px;
    position: absolute;
    transform: translateY(var(--y-offset));
    transition: transform 350ms;
    transition-delay: 200ms;
    left: 0;
    width: 200px;
  }

  .icon {
    @include size(15px);
  }
</style>

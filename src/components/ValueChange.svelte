<script context="module">
  export const percentChange = (change) => `${parseFloat(change).toFixed(2)}%`
</script>

<script>
  let klass = ''
  export { klass as class }
  export let change = 0
  export let formatter = (val) => val

  let res
  $: res = change > 0 ? 'up' : 'down'
</script>

<template lang="pug">
include /ui/mixins

span.change(class='{klass} {res}')
  +icon('triangle-up').triangle
  | {formatter(Math.abs(change))}
</template>

<style lang="scss">
  @import '@/mixins';

  .triangle {
    @include size(6px, 4px);
    margin-right: 6px;
  }

  .change {
    color: var(--orange);
    fill: var(--orange);
  }

  .up {
    color: var(--lima);
    fill: var(--lima);
  }

  .down {
    color: var(--red);
    fill: var(--red);

    .triangle {
      transform: rotate(180deg);
    }
  }
</style>

<script>
  export let active
</script>

<template lang="pug">
.toggle(on:click, class:active)
  img(src="/toggle.svg", alt="toggle")
</template>

<style lang="scss">
  @import '@/variables';

  .toggle {
    user-select: none;
    position: relative;
    cursor: pointer;
    display: inline-block;
    background: var(--casper);
    line-height: 0;
    border-radius: 10px;
    transition: background 200ms;

    &::before {
      display: inline-block;
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      background: $white;
      border-radius: 10px;
      transition: transform 200ms;
      left: 3px;
      top: 3px;
    }

    &.active {
      background: var(--jungle-green);

      &::before {
        transform: translateX(calc(100% + 2px));
      }
    }
  }
</style>

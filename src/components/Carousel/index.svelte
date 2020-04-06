<script>
  export let children

  let activeIndicator = 0

  function onScroll({ currentTarget }) {
    const { scrollWidth, scrollLeft } = currentTarget
    const sectionWidth = scrollWidth / children

    activeIndicator = Math.round(scrollLeft / sectionWidth)
  }
</script>

<template lang="pug">
include /ui/mixins

.carousel(on:scroll='{onScroll}')
  slot

.indicators
  +each('Array(children) as _, i')
    .indicator(class:active='{activeIndicator === i}')

</template>

<style lang="scss">
  @import '@/mixins.scss';

  .carousel {
    flex: 1;
    overflow-x: auto;
    display: flex;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
      display: none;
    }

    & > :global(div) {
      scroll-snap-align: center;
      min-width: 100%;
      min-height: 100%;
      margin-right: 32px;
    }
  }

  .indicators {
    line-height: 0;
    font-size: 0;
    text-align: center;
    margin: 8px 0 24px;
  }

  .indicator {
    display: inline-block;
    background: var(--casper);
    @include size(6px);
    border-radius: 50%;
    margin-right: 16px;

    &:last-child {
      margin: 0;
    }

    &.active {
      background: var(--rhino);
    }
  }
</style>

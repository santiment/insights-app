<script>
  export let centered = true,
    margin = false,
    closeLink = '/'
</script>

<template lang="pug">
include /ui/mixins

+panel.mobile-card(variant='box', class:centered, class:margin)
  +button(accent='jungle-green', href='{closeLink}')
    +icon('close')
  slot
</template>

<style lang="scss">
  @import '@/mixins.scss';

  .mobile-card {
    padding: 40px 24px 31px 24px;
    border-radius: 10px;
    position: relative;
    text-align: center;
  }

  .centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  .margin {
    margin: 0 0 16px;
  }

  a {
    position: absolute;
    top: 15px;
    right: 12px;
    fill: var(--waterloo);
  }

  svg {
    @include size(16px);
  }
</style>

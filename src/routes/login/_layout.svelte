<script context="module">
  export async function preload(_, session) {
    await session.loadingUser
    if (session.currentUser) {
      return this.redirect(302, '')
    }
  }
</script>

<template lang="pug">
include /ui/mixins


.wrapper
  +panel(variant='box').content
    slot
</template>

<style lang="scss">
  @import '@/mixins.scss';

  .wrapper {
    display: flex;
    align-items: center;
    height: 100%;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      background: url('/login-bg.svg') no-repeat 50%;
    }
  }

  .content {
    min-width: 608px;
    margin: 0 auto;
    padding: 30px 80px 36px;
    text-align: center;

    @include responsive('phone', 'phone-xs') {
      width: 100%;
      padding: 15px 30px;
    }
  }
</style>

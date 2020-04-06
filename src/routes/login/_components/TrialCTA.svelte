<template lang="pug">
include /ui/mixins

.wrapper
  h2 Start your free trial
  p Enjoy 14 days free of Sanbase Pro, no card or payment information required
  +button(variant='fill', accent='jungle-green', href='/sign-up', fluid) Start my Free Trial

</template>

<style lang="scss">
  @import '@/mixins.scss';

  .wrapper {
    padding-top: 116px;
    background: url('/present.svg') no-repeat 50% 0;
  }

  h2 {
    @include text('h3');
  }

  p {
    @include text('body-2');
    color: var(--waterloo);
    margin: 10px 0 18px;
  }

  a {
    justify-content: center;
    height: 40px;
    max-width: 280px;
    margin: 0 auto;
  }
</style>

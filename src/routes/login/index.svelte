<script>
  import MetamaskBtn from '@/components/login/MetamaskBtn'
</script>

<template lang="pug">
include /ui/mixins

.wrapper
  .left
    h2 Welcome to Insights

    .options
      MetamaskBtn
      .divide or use
      +button.btn(border, accent='jungle-green', href='/login/email', fluid)
        +icon('email')
        |Email

    .new New to Santiment? 
      a.create(href='/sign-up') Create an account

  .right
    h2 Start your free trial
    p Enjoy 14 days free of Sanbase Pro, no card or payment information required
    +button.btn.trial(variant='fill', accent='jungle-green', href='/sign-up', fluid) Start my Free Trial

</template>

<style lang="scss">
  @import '@/mixins.scss';

  .wrapper {
    display: flex;
    padding: 20px 30px;
  }

  .right {
    margin-left: 114px;
    padding: 116px 0 0 114px;
    max-width: 435px;
    border-left: 1px solid var(--porcelain);
    background: url('/present.svg') no-repeat 175px 0;
  }

  .trial {
    max-width: 280px;
    margin: 0 auto;
  }

  h2 {
    @include text('h3');
  }

  p {
    @include text('body-2');
    color: var(--waterloo);
    margin: 10px 0 18px;
  }

  .options {
    margin: 26px 0;
  }

  .divide {
    @include text('caption', 'm');
    color: var(--waterloo);
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin: 24px 0;

    &::before,
    &::after {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      background: var(--porcelain);
    }

    &::before {
      margin-right: 11px;
    }

    &::after {
      margin-left: 11px;
    }
  }

  .btn {
    justify-content: center;
    height: 40px;
  }

  .new {
    @include text('body-2');
    color: var(--waterloo);
  }

  .create {
    color: var(--jungle-green);
    &:hover {
      color: var(--jungle-green-hover);
    }
  }

  svg {
    @include size(16px, 14px);
    margin-right: 10px;
  }
</style>

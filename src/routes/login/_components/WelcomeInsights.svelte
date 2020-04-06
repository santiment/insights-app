<script>
  import MetamaskBtn from '@/components/login/MetamaskBtn'
</script>

<template lang="pug">
include /ui/mixins

h2 Welcome to Insights

.options
  MetamaskBtn

  .divide or use

  +button.btn(border, accent='jungle-green', href='/login/email', fluid)
    +icon('email').icon-email
    |Email

.link New to Santiment? 
  a.create(href='/sign-up') Create an account
</template>

<style lang="scss">
  @import '@/mixins.scss';

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

  .link {
    @include text('body-2');
    color: var(--waterloo);
  }

  .create {
    color: var(--jungle-green);
    &:hover {
      color: var(--jungle-green-hover);
    }
  }

  .icon-email {
    @include size(16px, 14px);
    margin-right: 10px;
  }
</style>

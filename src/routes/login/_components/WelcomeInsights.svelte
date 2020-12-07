<script>
  import MetamaskBtn from '@/components/login/MetamaskBtn'
</script>

<template lang="pug">
include /ui/mixins

h2 Welcome to Insights

.options
  MetamaskBtn

  .divide or use

  +button.btn(border, href='/login/email', fluid)
    +icon('email').icon-email
    |Email

  +button.btn.btn_google(border, href!='{process.env.BACKEND_URL}/auth/google', fluid)
    img(src='google.svg').icon-google
    |Sign in with Google

.link New to Santiment? 
  a.create(href='/sign-up') Create an account
</template>

<style lang="scss">
  @import '@/mixins.scss';

  h2 {
    @include text('h3');
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
    fill: var(--casper);
    color: var(--rhino);
    borde-color: var(--porcelain);

    &:hover {
      color: var(--jungle-green);
      fill: var(--jungle-green);
    }

    &_google {
      margin-top: 8px;
    }
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
  .icon-google {
    margin-right: 10px;
  }
</style>

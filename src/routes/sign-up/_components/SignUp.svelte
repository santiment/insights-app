<script>
  import EmailForm from '../../login/_components/EmailForm.svelte'
</script>

<template lang="pug">
include /ui/mixins

h2 Sign up now to start your free trial
p Get 14 days free of Sanbase Pro!

+button.btn(border, href!='{process.env.BACKEND_URL}/auth/google', fluid)
  img(src='google.svg').icon-google
  |Sign in with Google

.divide or use

EmailForm(on:success)

.link Have an account? 
  a(href='/login') Log in
</template>

<style lang="scss">
  @import '@/mixins.scss';

  h2 {
    @include text('h3');
  }

  p {
    @include text('body-2');
    color: var(--waterloo);
    margin: 10px 0 34px;
  }

  .link {
    @include text('body-2');
    color: var(--waterloo);
    margin: 24px 0 0;
  }

  a {
    color: var(--jungle-green);
    &:hover {
      color: var(--jungle-green-hover);
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
  }

  .icon-google {
    margin-right: 10px;
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
</style>

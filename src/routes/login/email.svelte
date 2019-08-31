<script>
  import { loginEmail } from '@/logic/login'

  let loading = false
  let success

  function onSubmit({ currentTarget }) {
    loginEmail(currentTarget.email.value).then(isSuccess)

    loading = true
  }

  function isSuccess({ data: { emailLogin } }) {
    success = emailLogin.success
    loading = false
  }
</script>

<template lang="pug">
include /ui/mixins

h2.title.email__title Authenticate

+if('success === true')
  h3.email__subtitle We sent an email to you. Please login in to email provider and click the confirm link. Waiting for your confirmation...

  +else()
    h3.email__subtitle To sign up or log in, fill in your email address below
    form.email__form(on:submit|preventDefault="{onSubmit}")
      +input(placeholder="your@email.com",name="email",type="email",autocomplete='off', required)
      +button.email__btn(variant="fill", accent='jungle-green', type='submit', class:loading) Continue

a.email__link(href='/login') All login options
</template>

<style lang="scss">
  @import '@/mixins.scss';

  .title {
    @include text('body-1');
  }

  .btn {
    display: flex;
    align-items: center;
    background: #7a859e;
    border-radius: 4px;
    color: #fff;
    fill: #fff;
    padding: 8px 12px;
    text-align: left;
  }

  .email {
    &__subtitle {
      @include text('caption');
      margin: 10px 0;
    }

    &__form {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__btn {
      margin: 15px 0 30px;
    }

    &__link {
      font-size: 12px;
      color: var(--casper);
      fill: var(--casper);
    }
  }

  input {
    width: 100%;
  }
</style>

<script>
  import { client } from '@/apollo'
  import { EMAIL_REGISTRATION } from '@/gql/login'

  let loading = false
  let success = undefined

  function onSubmit({ currentTarget }) {
    client
      .mutate({
        mutation: EMAIL_REGISTRATION,
        variables: {
          email: currentTarget.email.value,
          consent: '',
        },
      })
      .then(isSuccess)

    loading = true
  }

  function isSuccess({ data: { emailLogin } }) {
    success = emailLogin.success
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
      +input.input(placeholder="your@email.com",name="email",type="email",autocomplete='off', required)
      +button.email__btn(variant="fill", accent='jungle-green', type='submit', class:disabled="{loading}") Continue

a.email__link(href='/login') All login options
</template>

<style lang="scss">
  @import '@/mixins.scss';

  .title {
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;

    @include responsive('phone', 'phone-xs') {
      color: red;
    }
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
      font-size: 12px;
      font-weight: normal;
      line-height: 18px;
      margin: 10px 0;
    }

    &__form {
      margin-top: 20px;
    }

    &__btn {
      margin: 15px 0 30px;
    }

    &__link {
      font-size: 12px;
    }
  }
</style>

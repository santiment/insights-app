<script>
  import { client } from '@/apollo'
  import Checkbox from '@/components/Checkbox'
  import { setGDPR } from '@/logic/gdpr'
  import { WEEKLY_SUBSCRIPTION_FLAG } from '@/logic/login'
  import { NEWSLETTER_SUBSCRIPTION_MUTATION } from '@/gql/user'

  let active = false
  let loading = false

  function onClick() {
    loading = true
    setGDPR(true).then(() => {
      if (localStorage.getItem(WEEKLY_SUBSCRIPTION_FLAG)) {
        localStorage.removeItem(WEEKLY_SUBSCRIPTION_FLAG)

        client.mutate({
          mutation: NEWSLETTER_SUBSCRIPTION_MUTATION,
          variables: {
            subscription: 'WEEKLY',
          },
        })
      }
    })
  }
</script>

<template lang="pug">
include /ui/mixins

svelte:head
  title GDPR - Santiment Insights
  meta(property='og:title', content='GDPR - Santiment Insights')

.page
  +panel.wrapper(variant='box')
    h2 Last step to get your SANBase experience.
    p Please, accept our updated Privacy Policy by May, 2018 to continue using SANBase
    div
      Checkbox(bind:active)
      |  I have read and accept the 
      a(href='https://app.santiment.net/privacy-policy') Santiment Privacy Policy
    .btn
      +button(variant='fill', accent='jungle-green', class:disabled='{!active}', class:loading, on:click='{onClick}') I Agree
</template>

<style lang="scss">
  @import '@/mixins';

  .page {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrapper {
    padding: 16px;
    max-width: 500px;
  }

  h2 {
    @include text('h4', 'm');
  }

  p {
    margin: 12px 0;
  }

  a {
    color: var(--jungle-green);

    &:hover {
      color: var(--jungle-green-hover);
      text-decoration: underline;
    }
  }

  .btn {
    text-align: right;
  }
</style>

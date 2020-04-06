<script>
  import { checkIsMobile } from '@/utils/responsive'
  import Confirmation from './_components/Confirmation.svelte'
  import Email from './_components/Email.svelte'

  const isMobile = checkIsMobile()

  let email

  function onSuccess({ detail }) {
    email = detail.email
  }
</script>

<template lang="pug">
include /ui/mixins

+if('isMobile')
  .mobile-wrapper
    +if('email')
      +panel.mobile-card(variant='box')
        Confirmation({email})

      +else()
        +panel.mobile-card(variant='box')
          Email(on:success='{onSuccess}')


  +else()
    .wrapper 
      +if('email')
        Confirmation({email})

        +else()
          Email(on:success='{onSuccess}')

</template>

<style lang="scss">
  @import '@/mixins.scss';

  .mobile-wrapper {
    height: 100%;
    padding: 0 0 44px;
    display: flex;
    flex-direction: column;
  }

  .mobile-card {
    text-align: center;
    padding: 40px 24px 31px 24px;
    border-radius: 10px;
    height: 100%;
    margin: 0 0 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .wrapper {
    max-width: 320px;
    margin: 0 auto;
  }
</style>

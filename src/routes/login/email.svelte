<script>
  import { checkIsMobile } from '@/utils/responsive'
  import Confirmation from './_components/Confirmation.svelte'
  import Email from './_components/Email.svelte'
  import MobileCard from './_components/MobileCard.svelte'

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
      MobileCard
        Confirmation({email})

      +else()
        MobileCard
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
    padding: 0 0 60px;
  }

  .wrapper {
    max-width: 320px;
    margin: 0 auto;
  }
</style>

<script context="module">
  export async function preload(_, session) {
    await session.loadingUser
    if (session.currentUser) {
      return this.redirect(302, '')
    }
  }
</script>

<script>
  import { checkIsMobile } from '@/utils/responsive'
  import Carousel from '@/components/Carousel/index.svelte'
  import SignUp from './_components/SignUp.svelte'
  import Reasons from './_components/Reasons.svelte'
  import Confirmation from '../login/_components/Confirmation.svelte'
  import MobileCard from '../login/_components/MobileCard.svelte'

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
      MobileCard(margin)
        Confirmation({email})

      +else()
        Carousel(children='{2}')
          MobileCard
            SignUp(on:success='{onSuccess}')
          MobileCard
            Reasons 

  +else()
    .wrapper
      +panel(variant='box').content
          +if('email')
            .success
              Confirmation({email})

            +else
              .left
                SignUp(on:success='{onSuccess}')
              .right
                Reasons 

</template>

<style lang="scss">
  @import '@/mixins.scss';

  .mobile-wrapper {
    height: 100%;
    padding: 0 0 44px;
    display: flex;
    flex-direction: column;
  }

  .wrapper {
    display: flex;
    align-items: center;
    height: 100%;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      background: url('/login-bg.svg') no-repeat 50%;
    }
  }

  .content {
    margin: 0 auto;
    padding: 55px 110px;
    display: flex;
    min-width: 608px;
  }

  .left {
    max-width: 285px;
    text-align: center;
  }

  .right {
    margin-left: 110px;
    padding: 0 0 0 96px;
    border-left: 1px solid var(--porcelain);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .success {
    max-width: 320px;
    text-align: center;
    margin: 0 auto;
  }
</style>

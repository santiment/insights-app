<script>
  import Carousel from '@/components/Carousel/index.svelte'
  import MetamaskBtn from '@/components/login/MetamaskBtn'
  import WelcomeInsights from './_components/WelcomeInsights.svelte'
  import TrialCTA from './_components/TrialCTA.svelte'

  import { checkIsMobile } from '@/utils/responsive'

  const isMobile = checkIsMobile()

  console.log(isMobile)
</script>

<template lang="pug">
include /ui/mixins

+if('isMobile')
  .mobile-wrapper
    Carousel(children='{2}')
      +panel.mobile-card(variant='box')
        WelcomeInsights 
        
      +panel.mobile-card(variant='box')
        TrialCTA 

  +else()
    .wrapper
      .left
        WelcomeInsights 
      .right
        TrialCTA 

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
  }

  .wrapper {
    display: flex;
    padding: 20px 30px;
  }

  .left {
    max-width: 340px;
  }

  .right {
    display: flex;
    align-items: center;
    margin-left: 114px;
    padding-left: 114px;
    max-width: 435px;
    border-left: 1px solid var(--porcelain);
  }
</style>

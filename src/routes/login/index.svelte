<script>
  import Carousel from '@/components/Carousel/index.svelte'
  import MetamaskBtn from '@/components/login/MetamaskBtn'
  import { checkIsMobile } from '@/utils/responsive'
  import WelcomeInsights from './_components/WelcomeInsights.svelte'
  import TrialCTA from './_components/TrialCTA.svelte'
  import MobileCard from './_components/MobileCard.svelte'

  const isMobile = checkIsMobile()
</script>

<template lang="pug">
include /ui/mixins

+if('isMobile')
  .mobile-wrapper
    Carousel(children='{2}')
      MobileCard(centered='')
        WelcomeInsights 

      MobileCard
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

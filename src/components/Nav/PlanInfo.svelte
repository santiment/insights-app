<script>
  import { user$ } from '@/stores/user'
  import { subscription$ } from '@/stores/user/subscription'
  import { getTrialDaysLeft } from '@/utils/plans'

  const currentUser = user$()
  const userSubscription = subscription$()

  $: isAnonUser = !$currentUser
  $: subscription = $userSubscription
  $: trialDaysLeft = getTrialDaysLeft(subscription)
  $: trialPostfix = trialDaysLeft ? `Trial (${trialDaysLeft})` : ''
</script>

<template lang="pug">
include /ui/mixins

+if('isAnonUser')
  a.text(href='/login') Sign in

  +elseif('!subscription')
    .text.free Free plan
      a.upgrade(href='https://app.santiment.net/pricing') Upgrade
  +else()
    a.text.pro(href='https://academy.santiment.net/products-and-plans/sanbase-pro-features/', variant='fill', accent='texas-rose')
      +icon('crown')
      |Pro {trialPostfix}

</template>

<style lang="scss">
  @import '@/variables';
  @import '@/mixins';

  .text {
    @include text('caption');
    color: var(--waterloo);
    margin-right: 12px;
  }

  a:hover {
    color: var(--jungle-green);
  }

  .upgrade {
    position: absolute;
    right: 0;
    bottom: -15px;
    transition: opacity 200ms;
    opacity: 0;
    pointer-events: none;

    &,
    &:active {
      color: var(--texas-rose);
    }

    &:hover {
      color: var(--texas-rose-hover);
    }
  }

  .free {
    position: relative;
    transition: transform 200ms;

    &:hover {
      transform: translateY(-6px);

      .upgrade {
        pointer-events: all;
        opacity: 1;
      }
    }
  }

  .pro {
    border-radius: 4px;
    height: 26px;
    padding: 4px 12px;
    background: var(--texas-rose-light);

    &,
    &:focus {
      color: var(--texas-rose);
      fill: var(--texas-rose);
    }

    &:hover {
      color: var(--texas-rose-hover);
      fill: var(--texas-rose-hover);
    }
  }

  svg {
    @include size(13px, 10px);
    margin-top: -2px;
    margin-right: 9px;
  }
</style>

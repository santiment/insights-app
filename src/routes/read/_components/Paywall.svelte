<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { goto } from '@sapper/app'
  import { client } from '@/apollo'
  import { sendEvent } from '@/analytics'
  import { user$ } from '@/stores/user'
  import { getSanbasePlans } from '@/logic/plans'
  import { postponePayment } from '@/logic/insights'

  const currentUser = user$()
  const dispatch = createEventDispatcher()

  let price = 51

  onMount(() => {
    getSanbasePlans().then((plans) => {
      const proPlan = plans.find(
        ({ name, isDeprecated, interval }) =>
          !isDeprecated && name === 'PRO' && interval === 'month',
      )

      if (proPlan) {
        price = proPlan.amount / 100
      }
    })
  })

  function onUpgradeClick() {
    sendEvent('upgrade', {
      method: `Insight Paywall`,
    })

    if (!$currentUser) {
      postponePayment()
      return goto('/login')
    }

    dispatch('upgradeClick')
  }
</script>

<template lang="pug">
include /ui/mixins

.wrapper
  h2 There’s more of this Insight
  h4 Choose your subscription plan

  +panel(variant='box').card
    h3 Sanbase PRO
    .description Unlock all PRO insights
    .price ${price}
      span.billing /mo
    +button.upgrade(variant='fill', accent='texas-rose', fluid, on:click='{onUpgradeClick}') Upgrade to PRO

  .benefit
    .content
      h3.title Years of market experience, compressed in each report
      p.text Since 2017, Santiment has been an industry leader in on-chain data, social intelligence and behavior-based analysis of the crypto market.
      p.text Our tools have a proven track record of timing price tops for cryptocurrencies, helping traders find profitable exit points and mitigate HODLing risk.
      h6.title__small Our previous TOP calls:
      a.link(href='https://insights.santiment.net/read/waves-crowd-sentiment-pattern-124') WAVES crowd sentiment pattern
      a.link(href='https://insights.santiment.net/read/matic-charts-a-new-ath%3A-is-the-top-in%3F-2959') MATIC charts a new ATH: is the top in?
      a.link(href='https://insights.santiment.net/read/icx-insanity.-how-far-could-it-go%3F-5611') ICX insanity. How far could it go?
    img.image(src='/insight_preview.png', alt='insight card')


  .benefit
    img.image(src='/signal_preview.png', alt='signal form')
    .content
      h3.title What you get with Sanbase Pro:
      ul.features
        li.feature Members-only daily market insights and analysis
        li.feature 30+ on-chain, social & project indicators for 900 cryptocurrencies
        li.feature Custom alerts for the coins' price, on-chain & social trends
        li.feature Santiment Spreadsheet plugin with 10+ pre-made market templates
        li.feature Personalized asset watchlists and weekly performance reports

  h2.call__title Gain unfair advantage with Sanbase Pro
  p.call__description Subscribe to Sanbase Pro for access to exclusive insights, market-beating metrics, strategies and templates!
  +button.call__upgrade(variant='fill', accent='texas-rose', fluid, on:click='{onUpgradeClick}') Subscribe to PRO


</template>

<style lang="scss">
  @import '@/variables';
  @import '@/mixins';

  .wrapper {
    width: 100%;
    text-align: center;
    position: relative;
    margin: 36px 0 0;
    padding: 95px 0 40px;
    background: url('/paywall.svg') no-repeat 50% 0;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(100% + 36px);
      height: 300px;
      background: linear-gradient(
        180deg,
        rgba($white, 0) 0%,
        rgba($white, 0.8) 51.04%,
        $white 100%
      );

      :global(.night-mode) & {
        background: linear-gradient(
          180deg,
          rgba($mirage, 0) 0%,
          rgba($mirage, 0.8) 51.04%,
          $mirage 100%
        );
      }
    }
  }

  h2 {
    @include text('h4', 'm');
  }

  h4 {
    color: var(--waterloo);
    margin: 8px 0 34px;
  }

  .card {
    display: inline-block;
    padding: 24px;
  }

  h3 {
    @include text('body-1', 'm');
  }

  .description {
    color: var(--waterloo);
    margin: 8px 0 15px;
  }

  .price {
    @include text('h3', 'm');
    margin: 0 0 23px;
  }

  .billing {
    color: var(--casper);
  }

  .upgrade {
    width: 240px;
    height: 40px;
    justify-content: center;
  }

  .question {
    margin-top: 32px;
  }

  .contact {
    color: var(--jungle-green);
    text-decoration: underline;

    &:hover {
      color: var(--jungle-green-hover);
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;

    &:first-of-type {
      margin: 0 24px;
    }
  }

  .image {
    width: 100%;
    max-width: 310px;
    border-radius: 4px;

    @include responsive('phone', 'phone-xs') {
      display: none;
    }
  }

  .benefit {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    max-width: 644px;
    margin: 64px 0;
  }

  .title {
    @include text('body-1');
    font-weight: 600;
    margin: 16px 0 24px;
  }

  .title__small {
    @include text('body-2');
    fonr-weight: 600;
    margin: 6px 0;
  }

  .text {
    @include text('body-2');
    color: var(--rhino);
    margin: 0 0 16px;
    opacity: 0.8;
  }

  .features {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .feature {
    @include text('body-2');
    margin: 0 0 18px;
    position: relative;
    padding-left: 24px;
    opacity: 0.8;

    &::before {
      content: url('/success-circle.svg');
      display: block;
      position: absolute;
      top: 5px;
      left: 0;
      opacity: 1;
    }
  }

  .link {
    color: var(--jungle-green);

    &:hover {
      text-decoration: underline;
    }
  }

  .call__title {
    margin: 0 0 16px;

    @include text('h4');
    font-weight: 600;
  }

  .call__description {
    color: var(--waterloo);
    max-width: 562px;
    width: 60%;
    margin: 0 auto 32px;
    opacity: 0.8;

    @include text('body-2');
  }

  .call__upgrade {
    width: 197px;
    justify-content: center;
    margin: 0 auto 40px;
  }

</style>


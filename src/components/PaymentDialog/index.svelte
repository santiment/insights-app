<script>
  import { getContext, onMount, createEventDispatcher } from 'svelte'
  import COLOR from '@santiment-network/ui/variables.scss'
  import Dialog from '@/ui/dialog/index'
  import TotalPrice from './TotalPrice.svelte'
  import ChargeInfo from './ChargeInfo.svelte'
  import DiscountInput from './DiscountInput.svelte'
  import PlanSelector from './PlanSelector.svelte'
  import { getSanbasePlans, getTokenDataByForm, buyPlan } from '@/logic/plans'
  import { getAlternativeBillingPlan } from '@/utils/plans'

  export let open

  const dispatch = createEventDispatcher()

  const style = {
    base: {
      fontSize: '14px',
      color: COLOR.mirage,
      fontFamily: 'Rubik, sans-serif',
      '::placeholder': {
        color: COLOR.casper,
      },
    },
    invalid: {
      color: COLOR.persimmon,
    },
  }

  const stripe = getContext('stripe')
  let stripeCard
  let stripeInput

  $: if ($stripe && stripeInput) {
    stripeCard = $stripe.elements().create('card', { style })
    stripeCard.mount('#card-element')
  }

  let loading = false
  let coupon
  let plans = []
  let currentPlan = {}
  $: alternativePlan = getAlternativeBillingPlan(plans, currentPlan)

  function onSubmit({ target }) {
    loading = true

    buyPlan($stripe, stripeCard, getTokenDataByForm(target), currentPlan)
      .then((subscription) => {
        dispatch('success', subscription)
        loading = false
      })
      .catch(() => {
        dispatch('error')
        loading = false
      })
  }

  onMount(() => {
    getSanbasePlans().then((sanbasePlans) => {
      plans = sanbasePlans
      currentPlan = sanbasePlans.find(({ name }) => name === 'PRO')
    })
  })
</script>

<template lang="pug">
include /ui/mixins

mixin field(name, label, placeholder)
  label= label
    +input()(name=name, required, placeholder=placeholder)

Dialog(bind:open, title='Payment details')
  +dialogScrollContent.wrapper(slot='content')
    form.main(on:submit|preventDefault='{onSubmit}')
      .info
        .top.card Card information
          .cards
            img(src='/visa.png', width='40', alt='Visa').visa
            img(src='/mastercard.png', width='40', alt='Mastercard')
        .form
          +field('name', 'Full name', 'John Doe')
          label Card number
            #card-element(bind:this='{stripeInput}')
          +field('address_country', 'Country', 'US')

      .address
        .top Billing address
        .form
          +field('address_line1', 'Street address', '1483 Pearl Street')
          +field('address_city', 'City', 'Sacramento')
          +field('address_state', 'State / Region', 'California')

      .confirmation
        .top Confirmation
          span.top__right Payment with DAI? 
            a(href='mailto:info@santiment.net') Contact us
        .form.form_white
          PlanSelector(bind:currentPlan, {plans})
          DiscountInput(bind:coupon)
          TotalPrice({currentPlan}, {...coupon})
          +button(type='submit', fluid, variant='fill', accent='jungle-green', class:loading).submit Go PRO now
          ChargeInfo({currentPlan})

    .footer
      span
        +icon('paylock').paylock
        | Fully secured checkout
      span.footer__info
        +icon('dollar').dollar
        | 30 day money back guarantee

</template>

<style lang="scss">
  @import '@/variables';
  @import '@/mixins';

  .wrapper {
    width: 945px;
    padding: 0;
    margin: 0;
  }

  .main {
    padding: 32px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 32px;
    grid-template-areas: 'info confirmation' 'address confirmation';
    display: grid;
    grid-row-gap: 24px;
  }

  .info {
    grid-area: info;
  }

  .address {
    grid-area: address;
  }

  .confirmation {
    grid-area: confirmation;
  }

  .top {
    display: flex;
    color: var(--waterloo);
    margin-bottom: 16px;
    @include text('caption', 'm');

    &__right {
      margin-left: auto;
    }
  }

  a {
    color: var(--jungle-green);

    &:hover {
      color: var(--jungle-green-hover);
    }
  }

  label {
    font-size: 12px;
    font-weight: 600px;
    display: block;
    color: var(--waterloo);
    margin-bottom: 3px;

    margin: 0 0 16px;

    &:last-child {
      margin: 0;
    }
  }

  .form {
    background: var(--athens);
    border-radius: 4px;
    padding: 24px 32px;
    border: 1px solid var(--porcelain);

    &_white {
      background: var(--white);
    }
  }

  input {
    width: 100%;
    height: 40px;
    color: var(--rhino);
  }

  #card-element {
    border: 1px solid var(--porcelain);
    border-radius: 4px;
    padding: 11px 10px;
    background: var(--white);
    margin-bottom: 5px;
    height: 40px;
  }

  .footer {
    text-align: center;
    background: var(--athens);
    color: var(--waterloo);
    fill: var(--casper);
    padding: 15px 24px;
    @include text('caption', 'm');

    &__info {
      margin-left: 49px;
    }
  }

  .submit {
    height: 40px;
    justify-content: center;
    margin: 37px 0 16px;
    --loading-dot-color: var(--white);
  }

  @include responsive('phone', 'phone-xs') {
    .wrapper {
      width: auto;
    }

    .main {
      grid-template-columns: 1fr;
      padding: 8px;
      grid-template-rows: 3fr;
      grid-template-areas:
        'info'
        'address'
        'confirmation';
    }

    .form {
      padding: 18px 12px;
    }

    .footer {
      display: flex;
      flex-direction: column;

      &__info {
        margin: 0;
      }
    }
  }

  .paylock {
    @include size(12px, 15px);
    margin-top: -2px;
  }

  .dollar {
    @include size(14px);
  }

  .paylock,
  .dollar {
    margin-right: 10px;
  }

  .card {
    position: relative;
  }

  .cards {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .visa {
    margin-right: 16px;
  }
</style>

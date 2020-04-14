<script>
  import { getContext, onMount } from 'svelte'
  import { client } from '@/apollo'
  import COLOR from '@santiment-network/ui/variables.scss'
  import { PLANS_QUERY } from '@/gql/plans'
  import Dialog from '@/ui/dialog/index'
  import { getSanbasePlans } from '@/logic/plans'
  import { getAlternativeBillingPlan, formatOnlyPrice } from '@/utils/plans'
  import TotalPrice from './TotalPrice.svelte'
  import ChargeInfo from './ChargeInfo.svelte'
  import DiscountInput from './DiscountInput.svelte'

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

  $: if ($stripe) {
    const card = $stripe.elements().create('card', { style })
    card.mount('#card-element')
  }

  let coupon
  let plans = []
  let currentPlan = {}
  $: alternativePlan = getAlternativeBillingPlan(plans, currentPlan)

  $: console.log(plans, currentPlan, alternativePlan)

  onMount(() => {
    getSanbasePlans().then(sanbasePlans => {
      plans = sanbasePlans
      currentPlan = sanbasePlans.find(({ name }) => name === 'PRO')
    })
  })
</script>

<template lang="pug">
include /ui/mixins

mixin field(label, placeholder)
  label= label
    +input()(required, placeholder=placeholder)

Dialog(open='{true}', title='Payment details')
  +dialogScrollContent.wrapper(slot='content')
    form.main
      .card.info
        .top Card information
        .form
          +field('Full name', 'John Doe')
          label Card number
            #card-element
          +field('Country', 'US')

      .card.address
        .top Billing address
        .form
          +field('Street address', '1483 Pearl Street')
          +field('City', 'Sacramento')
          +field('State / Region', 'California')

      .card.confirmation
        .top Confirmation
          span.top__right Payment with DAI? 
            a(href='mailto:info@santiment.net') Contact us
        .form.form_white
          DiscountInput(bind:coupon)
          TotalPrice({currentPlan}, {...coupon})
          +button(type='submit', fluid, variant='fill', accent='jungle-green').submit Go PRO now
          ChargeInfo({currentPlan})

    .footer
      span Fully secured checkout
      span.footer__info 30 day money back guarantee
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
  }
</style>

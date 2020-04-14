<script>
  import { onMount, getContext } from 'svelte'
  import { client } from '@/apollo'
  import { PLANS_QUERY } from '@/gql/plans'
  import { findSanbasePlans } from '@/utils/plans'
  import Dialog from '@/ui/dialog/index'
  import { sendEvent } from '@/analytics'
  import COLOR from '@santiment-network/ui/variables.scss'

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

  function onUpgradeClick() {}
</script>

<template lang="pug">
include /ui/mixins

Dialog(open='{true}', title='Payment details')
  +dialogScrollContent.wrapper(slot='content')
    .main
      .card.info
        .top Card information
        .form
          label Full name
            +input()(required, placeholder='John Doe')
          label Card number
            #card-element
          label Country
            +input()(required, placeholder='US')

      .card.address
        .top Billing address
        .form
          label Street address
            +input()(required, placeholder='1483 Pearl Street')
          label City
            +input()(required, placeholder='Sacramento')
          label State / Region
            +input()(required, placeholder='California')

      .card.confirmation
        .top Confirmation
          span.top__right Payment with DAI? 
            a(href='mailto:info@santiment.net') Contact us
        .form.form_white 123

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
</style>

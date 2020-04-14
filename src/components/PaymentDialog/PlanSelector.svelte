<script>
  import { onDestroy } from 'svelte'
  import {
    getYearMonthPrices,
    getAlternativeBillingPlan,
    formatOnlyPrice,
  } from '@/utils/plans'

  export let currentPlan, plans

  let opened = false
  let monthPlanPrice = ''
  let yearPlanMonthlyPrice = ''

  $: altPlan = getAlternativeBillingPlan(plans, currentPlan) || {}
  $: isYearBilling = currentPlan.interval === 'year'

  $: if (isYearBilling) {
    monthPlanPrice = getYearMonthPrices(altPlan.amount, 'month')[1]
    yearPlanMonthlyPrice = getYearMonthPrices(currentPlan.amount, 'year')[1]
  } else {
    monthPlanPrice = getYearMonthPrices(currentPlan.amount, 'month')[1]
    yearPlanMonthlyPrice = getYearMonthPrices(altPlan.amount, 'year')[1]
  }

  function toggleDropdown() {
    opened = !opened

    if (opened) {
      setTimeout(() =>
        window.addEventListener('click', closeDropdown, { once: true }),
      )
    }
  }

  function closeDropdown() {
    opened = false
  }

  function selectInterval({ currentTarget }) {
    currentPlan =
      currentTarget.dataset.interval === currentPlan.interval
        ? currentPlan
        : altPlan
  }

  onDestroy(() => {
    if (process.browser) {
      window.removeEventListener('click', closeDropdown)
    }
  })
</script>

<template lang="pug">
include /ui/mixins

.wrapper
  .selector
    .plan(on:click='{toggleDropdown}') {currentPlan.name} {currentPlan.interval}ly
      +icon('arrow-down').icon(class:opened)
    .cta Save 10% {isYearBilling ? '🎉' : 'with yearly billing'}

    +if('opened')
      .dropdown
        .option(on:click='{selectInterval}', data-interval='month', class:active!='{!isYearBilling}') Bill monthly - 
          span.amount {monthPlanPrice}/mo
        .option(on:click='{selectInterval}', data-interval='year', class:active='{isYearBilling}') Bill yearly - 
          span.amount {yearPlanMonthlyPrice}/mo
          span.save Save 10% 🎉

  .price {formatOnlyPrice(currentPlan.amount)} 
    span.billing / {currentPlan.interval}

</template>

<style lang="scss">
  @import '@/mixins';
  .wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 19px;
  }

  .selector {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .plan {
    @include text('body-1');
    font-weight: bold;
    color: var(--mirage);
    text-transform: lowercase;
    position: relative;
    cursor: pointer;
    fill: var(--casper);

    &::first-letter {
      text-transform: uppercase;
    }

    &:hover {
      fill: var(--jungle-green);
    }
  }

  .cta {
    @include text('caption');
    color: var(--jungle-green);
  }

  .icon {
    @include size(7px, 4px);
    margin-left: 10px;

    &.opened {
      transform: rotate(180deg);
    }
  }

  .price {
    font-size: 32px;
    line-height: 40px;
    color: var(--waterloo);
    margin-left: auto;
  }

  .billing {
    color: var(--casper);
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
  }

  .dropdown {
    position: absolute;
    border: 1px solid var(--porcelain);
    border-radius: 4px;
    background: var(--white);
    position: absolute;
    top: 29px;
    left: 0;
    z-index: 10;
    user-select: none;
  }

  .option {
    position: relative;
    cursor: pointer;
    padding: 8px 16px;
    white-space: nowrap;

    &:last-child {
      border-top: 1px solid var(--porcelain);
    }

    &:hover {
      background: var(--athens);
    }

    &.active::before {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 8px;
      width: 3px;
      height: 3px;
      background: var(--jungle-green);
      border-radius: 50%;
    }
  }

  .amount {
    font-weight: bold;
  }

  .save {
    @include text('caption', 'm');
    margin-left: 24px;
    color: var(--jungle-green);
  }
</style>

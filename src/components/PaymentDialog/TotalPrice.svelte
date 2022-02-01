<script>
  import { formatOnlyPrice } from '@/utils/plans'
  import { user$ } from '@/stores/user'

  export let currentPlan, percentOff

  const user = user$()

  $: hasSanDiscount = $user && $user.sanBalance >= 1000

  $: mainPosition = `${currentPlan.name} ${currentPlan.interval}ly`
  $: planPrice = currentPlan.amount

  $: resultPercentOff = percentOff || (hasSanDiscount && 20)

  $: amountOff = resultPercentOff
    ? Math.floor(planPrice * (resultPercentOff / 100))
    : 0

  $: discountMsg = percentOff
    ? 'Discount code'
    : hasSanDiscount && 'SAN Holder discount'
</script>

<template lang="pug">
include /ui/mixins

.holder Holding 1000 SAN tokens will result in a 20% discount. 
  a(href='https://santiment.net/about-santiment/how-to-buy-san/', target='_blank', rel='noopener noreferrer') Learn how to buy SAN.
  +icon('question-round').question

.row {mainPosition}
  div {formatOnlyPrice(planPrice)}

+if('resultPercentOff')
  .row {discountMsg} {resultPercentOff}%
    .discount -{formatOnlyPrice(amountOff)}

.row.total Total due
  .result {formatOnlyPrice(planPrice - amountOff)}

</template>

<style lang="scss">
  @import '@/variables';
  @import '@/mixins';

  .holder {
    position: relative;
    border-radius: 4px;
    color: var(--black);
    padding: 12px 16px 10px 40px;
    background: #ecfaf6;
    margin-bottom: 44px;
  }

  a {
    color: var(--green);
    text-decoration: underline;

    &:hover {
      color: var(--green-hover);
    }
  }

  .question {
    @include size(15px);
    position: absolute;
    left: 17px;
    top: 15px;
    fill: var(--black);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--waterloo);
    margin-bottom: 12px;
  }

  .discount {
    color: var(--green);
  }

  .total {
    padding-top: 25px;
    margin: 24px 0 0;
    border-top: 1px solid var(--porcelain);
    color: var(--black);
  }

  .result {
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
  }
</style>

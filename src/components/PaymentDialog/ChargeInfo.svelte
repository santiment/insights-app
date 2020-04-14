<script>
  import {
    getAlternativeBillingPlan,
    formatOnlyPrice,
    getNextPaymentDate,
  } from '@/utils/plans'

  export let currentPlan
</script>

<template lang="pug">
include /ui/mixins

.wrapper Your card will be charged 
  b {formatOnlyPrice(currentPlan.amount)} 
  | every {currentPlan.interval} until you decide to downgrade or unsubscribe. Next payment: 
  b {getNextPaymentDate(currentPlan.interval)}

</template>

<style lang="scss">
  @import '@/mixins';

  .wrapper {
    @include text('caption', 'm');
    color: var(--waterloo);
    text-align: center;
  }

  b {
    font-weight: bold;
  }
</style>

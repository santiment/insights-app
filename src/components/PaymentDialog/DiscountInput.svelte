<script>
  import { getCoupon } from '@/logic/plans'
  import { debounce } from '@/utils/func'

  export let coupon

  let loading = false

  const [checkCoupon] = debounce(input => {
    getCoupon(input)
      .then(result => {
        loading = false
        coupon = result
      })
      .catch(() => {
        loading = false
        coupon = undefined
      })
  }, 400)

  function onInput({ currentTarget: { value } }) {
    loading = true
    checkCoupon(value)
  }
</script>

<template lang="pug">
include /ui/mixins

label Discount code
  +input()(required, placeholder='2H8vZG5P', name='coupon', on:input='{onInput}')
  +if('loading')
    .spinner

    +elseif('coupon')
      +icon('success').valid

</template>

<style lang="scss">
  @import '@/mixins';

  label {
    font-size: 12px;
    font-weight: 600;
    display: block;
    color: var(--waterloo);
    margin-bottom: 16px;
    position: relative;
  }

  input {
    width: 100%;
    height: 40px;
  }

  .valid,
  .spinner {
    @include size(16px);
    position: absolute;
    top: 32px;
    right: 16px;
    fill: var(--jungle-green);
  }

  .spinner {
    animation: rotation 0.9s infinite linear;
    border-radius: 50%;
    border-top: 2px solid var(--casper);
    border-right: 2px solid var(--casper);
    border-bottom: 2px solid var(--casper);
    border-left: 2px solid var(--waterloo);
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

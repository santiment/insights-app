<template lang="pug">
include /ui/mixins

.wrapper
  h2 There’s more of this Insight
  h4 Choose your subscription plan

  +panel(variant='box').card
    h3 Sanbase PRO
    .description Unlock all paid insights
    .price $45
      span.billing /mo
    +button.upgrade(href='https://app.santiment.net/pricing', variant='fill', accent='texas-rose', fluid) Upgrade to PRO

  .question Any questions? 
    a.contact(href='/') Contact us
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
</style>

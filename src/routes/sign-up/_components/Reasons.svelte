<template lang="pug">
include /ui/mixins

.reason Full historical and present data for 30+ on-chain, social & development metrics
.reason Exclusive End-of-Month market & network reports from the Santiment team
.reason Complete access to our Spreadsheets plugin and our internal market templates

</template>

<style lang="scss">
  @import '@/mixins.scss';

  .reason {
    @include text('body-2');
    background: url('/sign-up-reason.svg') no-repeat 0 5px;
    padding: 0 0 0 40px;
    margin: 0 0 30px;
    max-width: 306px;
    text-align: left;

    &:last-child {
      margin: 0;
    }

    @include responsive('phone', 'phone-xs') {
      max-width: none;
    }
  }
</style>

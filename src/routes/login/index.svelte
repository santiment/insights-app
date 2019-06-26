<script>
  import MetamaskBtn from '@/components/login/MetamaskBtn'
</script>

<template lang="pug">
include /ui/mixins

h2.title Log in your account with
.options
  MetamaskBtn
  +button.btn(href='/login/email', fluid) Email

</template>

<style lang="scss">
  @import '@/mixins.scss';
  .title {
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
  }

  .options {
    margin: 29px 0 24px;
  }

  .btn {
    color: #fff;
    fill: #fff;
    height: 40px;
    margin: 8px 0;
    background: #7a859e;
  }
</style>

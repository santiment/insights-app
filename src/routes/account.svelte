<script>
  import AccountGeneral from '@/components/account/General'

  let hash = process.browser && (location.hash || '#general')

  function onHashChange({ newURL }) {
    hash = newURL.slice(newURL.lastIndexOf('#'))
  }
</script>

<template lang="pug">
include /ui/mixins

svelte:window(on:hashchange='{onHashChange}')

h1 Account Settings

+tabs.tabs
  +tab(href='/account#general', class:active="{hash === '#general'}") General
  +tab(href='/account#connections', class:active="{hash === '#connections'}") Connections
  +tab(href='/account#notifications', class:active="{hash === '#notifications'}") Notifications
  +tab(href='/account#get-tokens', class:active="{hash === '#get-tokens'}") Get tokens
  +tab(href='/account#api-keys', class:active="{hash === '#api-keys'}") API keys

AccountGeneral

</template>

<style lang="scss">
  @import '@/mixins';

  h1 {
    @include text('h3');
    margin-bottom: 10px;
  }

  .tabs {
    margin-bottom: 24px;
  }

  .setting {
    margin-bottom: 50px;

    &:last-child {
      margin: 0;
    }
  }
</style>

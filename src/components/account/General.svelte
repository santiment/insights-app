<script>
  import Toggle from '@/components/Toggle'
  import { ui } from '@/stores/ui'
</script>

<template lang="pug">
include /ui/mixins

+setting(title='General', id='general')
  +settingRow()
    div
      h3 Username
      h4 0x904b452a804e9c59bafb0fc9fcd56a7369d518b7
    +button(naked=true, accent='jungle-green') Change your username
  +settingRow()
    div
      h3 Email
      h4 0x904b452a804e9c59bafb0fc9fcd56a7369d518b7
    +button(naked=true, accent='jungle-green') Change your email
  +settingRow()
    div
      h3 Dark Mode
    Toggle(active='{$ui.darkMode}', on:click='{ui.toggleDarkMode}')
  +settingRow()
    div
      h3 Beta Mode
      h4 Get the access to new features that are under testing.
    Toggle(active='{$ui.betaMode}', on:click='{ui.toggleBetaMode}')
</template>

<style>
  h4 {
    color: var(--waterloo);
    margin-top: 6px;
  }
</style>

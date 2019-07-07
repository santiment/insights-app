<script></script>

<template lang="pug">
include /ui/mixins

+setting(title='Connections', id='connections')
  +settingRow()
    div
      h3 Metamask
      h4
        |You will get the ability to deposit tokens to your Sanbase account.
        br
        |Please follow futher instructions.

    +button(variant='fill', accent='jungle-green') Connect
  +settingRow()
    div
      h3 Telegram
      h4
        |You will get the ability to connect the bot and log in through Telegram.
        br
        |Please do not use Telegram Web as it might not be able to link account correctly.

    +button(variant='fill', accent='jungle-green') Connect
</template>

<style>
  h4 {
    color: var(--waterloo);
    margin-top: 6px;
  }
</style>

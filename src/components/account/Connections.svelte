<script>
  import { onMount } from 'svelte'
  import { stores } from '@sapper/app'
  import { test } from './test'
  import {
    USER_SETTINGS_TELEGRAM_QUERY,
    TELEGRAM_DEEP_LINK_QUERY,
  } from '@/gql/user'
  import { client } from '@/apollo'
  import { removeConnectedAddress, removeAddress$ } from '@/logic/account'
  import { notifications } from '@/stores/notifications'

  const { session } = stores()

  let accounts
  let hasMetamask
  let hasTelegram
  $: {
    const { currentUser } = $session
    accounts = currentUser.ethAccounts
    hasMetamask = accounts && accounts.length > 0
    hasTelegram = currentUser.settings && currentUser.settings.hasTelegramConnected
  }

  let metamask
  let telegram
  $: metamask = hasMetamask ? 'Disconnect' : 'Connect'
  $: telegram = hasTelegram ? 'Connected' : 'Connect'

  let telegramLink
  onMount(() => {
    client
      .query({
        query: TELEGRAM_DEEP_LINK_QUERY,
        context: { isRetriable: true },
      })
      .then(({ data: { getTelegramDeepLink } }) => {
        telegramLink = getTelegramDeepLink
      })
  })

  /* $: console.log($removeAddress$) */

  function onMetamaskClick() {
    removeConnectedAddress(accounts[0].address)
  }
</script>

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
    +button(variant='fill', accent='jungle-green', on:click='{onMetamaskClick}') {metamask}

  +settingRow()
    div
      h3 Telegram
      h4
        |You will get the ability to connect the bot and log in through Telegram.
        br
        |Please do not use Telegram Web as it might not be able to link account correctly.
    +button(href='{telegramLink}', variant='fill', accent='jungle-green', on:click='{test}', target='_blank', rel='noopener noreferrer' ) {telegram}
</template>

<style>
  h4 {
    color: var(--waterloo);
    margin-top: 6px;
  }
</style>

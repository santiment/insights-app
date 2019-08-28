<script>
  import Toggle from '@/components/Toggle'
  import { stores } from '@sapper/app'

  const { session } = stores()

  let subscription
  $: {
    const { settings } = $session.currentUser
    subscription = settings.newsletterSubscription
  }
</script>

<template lang="pug">
include /ui/mixins

+setting(title='Notifications', id='notifications')
  +settingRow()
    div
      h3 Email notifications
    Toggle

  +settingRow()
    div
      h3 Telegram notifications
    Toggle

  +settingRow()
    div
      h3 Digest
      h4 
        |Receive the best insights and signals on Sanbase
        br
        |personalized based on your interests.
    div
      +button.var(variant='flat', class:active="{subscription === 'DAILY'}") Daily
      +button.var(variant='flat', class:active="{subscription === 'WEEKLY'}") Weekly
      +button.var(variant='flat', class:active="{subscription === 'OFF'}") Off
</template>

<style lang="scss">
  h4 {
    color: var(--waterloo);
    margin-top: 6px;
  }

  .var {
    color: var(--waterloo);

    &:hover {
      color: var(--btn-accent-color-hover);
    }
  }
</style>

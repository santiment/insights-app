<script>
  import Notification from '@/components/Notification'
  import { notifications } from '@/stores/notifications'

  let items
  $: items = [...$notifications]
</script>

<template lang="pug">
.notifications
  +each('items as notification, i (notification.id)')
    Notification({notification}, {i})

</template>

<style lang="scss">
  @import '@/mixins';

  .notifications {
    z-index: 10000;
    position: fixed;
    bottom: 20px;
    left: 15px;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;

    @include responsive('phone', 'phone-xs') {
      top: 15px;
      bottom: auto;
      right: 15px;
      align-items: initial;
      justify-content: flex-end;
    }
  }
</style>

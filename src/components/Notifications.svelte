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
  .notifications {
    z-index: 10000;
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
  }
</style>

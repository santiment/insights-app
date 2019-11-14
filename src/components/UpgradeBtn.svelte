<script>
  import { stores } from '@sapper/app'
  import { getCurrentSanbaseSubscription } from '@/utils/plans'

  let klass = ''
  export { klass as class }

  const { session } = stores()

  let withoutPlan
  $: withoutPlan = !getCurrentSanbaseSubscription($session.currentUser)
</script>

<template lang="pug">
include /ui/mixins
- var appPath = 'https://app.santiment.net'

+if('withoutPlan')
  +button(href=appPath+'/pricing', accent='texas-rose', border, class='{klass}')
    +icon('crown')
    |Upgrade
</template>

<style lang="scss">
  @import '@/mixins';

  svg {
    @include size(13px, 10px);
    margin-right: 9px;
  }
</style>

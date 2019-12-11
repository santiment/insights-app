<script>
  import InsightCardInternals from '@/components/insights/InsightCardInternals'
  import { dateDifferenceInWords } from '@/utils/dates'

  let klass = ''
  export { klass as class }
  export let insight,
    size = 'xl'
</script>

<template lang="pug">
include /ui/mixins

+panel.wrapper(variant='box', class="{klass} {size}")
  InsightCardInternals({insight}, {size})
</template>

<style lang="scss">
  .wrapper {
    padding: 20px;
    min-width: 320px;
    min-height: 190px;
    display: flex;
    flex-direction: column;
  }

  .m {
    padding: 20px 24px 18px;
  }
</style>

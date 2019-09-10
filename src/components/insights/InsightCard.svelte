<script>
  import InsightCardInternals from '@/components/insights/InsightCardInternals'
  import { dateDifferenceInWords } from '@/utils/dates'

  let klass = ''
  export { klass as class }
  export let insight
</script>

<template lang="pug">
include /ui/mixins

+panel.wrapper(variant='box', class="{klass}")
  InsightCardInternals({insight})
</template>

<style lang="scss">
  .wrapper {
    padding: 20px;
    min-width: 320px;
    height: 200px;
    display: flex;
    flex-direction: column;
  }
</style>

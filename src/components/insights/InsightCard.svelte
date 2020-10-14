<script>
  import InsightCardInternals from '@/components/insights/InsightCardInternals'

  let klass = ''
  export { klass as class }
  export let insight,
    transformLink
</script>

<template lang="pug">
include /ui/mixins

+panel.wrapper(class="{klass}")
  InsightCardInternals({insight}, {transformLink})
</template>

<style lang="scss">
  .wrapper {
    min-width: 320px;
    display: flex;
    flex-direction: column;
  }

</style>

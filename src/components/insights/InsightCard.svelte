<script>
  import InsightCardInternals from '@/components/insights/InsightCardInternals'

  let klass = ''
  export { klass as class }
  export let insight,
    size = 'xl',
    transformLink
</script>

<template lang="pug">
include /ui/mixins

+panel.wrapper(variant='box', class="{klass} {size}")
  InsightCardInternals({insight}, {size}, {transformLink})
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

<script>
  import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
  import Bottom from './Bottom.svelte'

  let className = ''
  export { className as class }
  export let insight

  $: ({ id, title } = insight)
  $: href = '/read/' + getSEOLinkFromIdAndTitle(id, title)
</script>

<div class="border row {className}">
  <div class="column fluid">
    <div class="top">
      <slot {href} />
    </div>
    <Bottom {insight} />
  </div>
  <slot name="right" />
</div>

<style>
  .top {
    padding: 18px 16px 16px 24px;
  }
</style>

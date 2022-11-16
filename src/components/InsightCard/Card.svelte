<script>
  import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
  import Bottom from './Bottom.svelte'

  let className = ''
  export { className as class }
  export let insight
  export let source

  let node

  $: ({ id, title } = insight)
  $: href = '/read/' + getSEOLinkFromIdAndTitle(id, title)
</script>

<div class="border row {className}" bind:this={node}>
  <div class="column fluid">
    <div class="top">
      <slot {href} {node} />
    </div>
    <Bottom {insight} {href} {source} />
  </div>
  <slot name="right" />
</div>

<style>
  .top {
    padding: 18px 16px 16px 24px;
  }

  .fluid {
    min-width: 0;
  }
</style>

<script>
  import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
  import Bottom from './Bottom.svelte'

  let className = ''
  export { className as class }
  export let insight
  export let source
  export let currentUser

  let node

  $: ({ id, title } = insight)
  $: href = '/insights/read/' + getSEOLinkFromIdAndTitle(id, title)
</script>

<div class="border row {className}" bind:this={node}>
  <div class="column fluid">
    <div class="top column">
      <slot {href} {node} />
    </div>
    <Bottom {insight} {href} {source} {currentUser} />
  </div>
  <slot name="right" />
</div>

<style lang="scss">
  .top {
    padding: 18px 16px 16px 24px;

    :global(body:not(.desktop)) & {
      padding: 16px 20px;
    }
  }

  .fluid {
    min-width: 0;
  }
</style>

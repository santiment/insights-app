<script>
  import Tooltip from 'webkit/ui/Tooltip/svelte'
  import ProjectSelector from './ProjectSelector.svelte'
  import TagSelector from './TagSelector.svelte'

  export let insight
  export let isEnabled
  export let loading = false
  export let update

  let project
  let tags = insight.tags
</script>

<Tooltip
  position="top"
  align="end"
  on="click"
  {isEnabled}
  class="$style.tooltip"
  closeTimeout={500}>
  <svelte:fragment slot="trigger">
    <slot />
  </svelte:fragment>

  <svelte:fragment slot="tooltip">
    <div>Select a coin for the price minichart and add tags to attract more readers</div>
    <div class="label caption">Price minichart to show</div>
    <ProjectSelector {project} {update} />

    <div class="label caption">Tags ({tags.length}/5)</div>
    <TagSelector bind:tags {update} />

    <button class="btn-1 fluid mrg-xl mrg--t" class:loading>Publish insight</button>
  </svelte:fragment>
</Tooltip>

<style>
  .tooltip {
    padding: 15px;
    width: 317px;
    overflow: visible !important;
    left: unset !important;
    top: unset !important;
    right: 0;
    bottom: 55px;
  }

  .label {
    font-weight: 500;
    color: var(--waterloo);
    margin: 16px 0 3px;
  }
</style>

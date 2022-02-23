<script>
  import Tooltip from 'webkit/ui/Tooltip/svelte'
  import ProjectSelector from './ProjectSelector.svelte'
  import TagSelector from './TagSelector.svelte'

  export let isEnabled
</script>

<Tooltip
  position="top"
  align="end"
  on="click"
  {isEnabled}
  isOpened
  closeTimeout={9999999}
  class="$style.tooltip">
  <svelte:fragment slot="trigger">
    <slot />
  </svelte:fragment>

  <svelte:fragment slot="tooltip">
    <div>Select a coin for the price minichart and add tags to attract more readers</div>
    <div class="label caption">Price minichart to show</div>
    <ProjectSelector />

    <div class="label caption">Tags (0/5)</div>
    <TagSelector />

    <button class="btn-1 fluid mrg-xl mrg--t">Publish insight</button>
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

<script>
  import Tooltip from 'webkit/ui/Tooltip/svelte'
  import Svg from 'webkit/ui/Svg/svelte'

  export let isEnabled
</script>

<Tooltip position="top" align="end" on="click" {isEnabled}>
  <svelte:fragment slot="trigger">
    <slot />
  </svelte:fragment>

  <div slot="tooltip" class="tooltip">
    <div class="mrg-l mrg--b">
      Select a coin for the price minichart and add tags to attract more readers
    </div>
    <div class="label caption">Price minichart to show</div>
    <div class="label caption">Tags (0/5)</div>
    <button class="btn-1 fluid mrg-xl mrg--t">Publish insight</button>
  </div>
</Tooltip>

<style>
  .tooltip {
    padding: 15px;
    width: 317px;
  }

  .label {
    font-weight: 500;
    color: var(--waterloo);
    margin: 0 0 3px;
  }
</style>

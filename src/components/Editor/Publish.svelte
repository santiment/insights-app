<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Requirements from './Requirements.svelte'
  import PublishSettings from './PublishSettings.svelte'

  export let insight
  export let requirements

  $: disabled = !checkRequirements(requirements)

  function checkRequirements({ title, text, pulse }) {
    return title && text && pulse
  }
</script>

<Requirements {disabled} {requirements} isPulse={insight.isPulse}>
  <PublishSettings>
    <div class="btn-2 btn-1 btn--s" class:disabled>
      Publish insight
      <Svg id="arrow" w="8" h="5" class="mrg-xs mrg--l" />
    </div>
  </PublishSettings>
</Requirements>

<style>
  .btn-2 {
    --border: var(--green);
  }
  .disabled {
    --border: var(--porcelain);
  }
</style>

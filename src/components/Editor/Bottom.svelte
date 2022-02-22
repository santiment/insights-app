<script>
  import Toggle from 'webkit/ui/Toggle'
  import Svg from 'webkit/ui/Svg/svelte'
  import SaveInfo from './SaveInfo.svelte'

  export let insight
  export let isDraft = true
  export let isSaving = false
</script>

<div class="bottom row v-center">
  <div class="c-casper">
    {#if isSaving}
      Saving...
    {:else}
      <SaveInfo {insight} {isDraft} />
    {/if}
  </div>

  <button
    class="pulse btn row v-center c-waterloo mrg-xl mrg--r mrg--l"
    on:click={() => (insight.isPulse = !insight.isPulse)}>
    Pulse insight
    <Toggle isActive={insight.isPulse} class="mrg-s mrg--l" />
  </button>

  <div class="btn-2 btn-1 btn--s">
    Publish insight
    <Svg id="arrow" w="8" h="5" class="mrg-xs mrg--l" />
  </div>
</div>

<style lang="scss">
  .bottom {
    position: fixed;
    bottom: 0;
    right: calc(50% - 570px);
    background: linear-gradient(270deg, var(--white) 83%, var(--white) 100%);
    padding: 15px 0;
  }

  .btn-2 {
    --border: var(--green);
  }

  .pulse {
    --color-hover: var(--black);
  }
</style>

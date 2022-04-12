<script>
  import Toggle from 'webkit/ui/Toggle'
  import Publish from './Publish.svelte'
  import SaveInfo from './SaveInfo.svelte'

  export let insight
  export let tags
  export let requirements
  export let isDraft = true
  export let isSaving = false
  export let update
  export let updateInsight, publishDraft

  function onPulseClick() {
    insight.isPulse = !insight.isPulse
    update()
  }
</script>

<div class="bottom row v-center">
  {#if insight.id}
    <div class="c-casper">
      {#if isSaving}
        Saving...
      {:else}
        <SaveInfo {insight} {isDraft} />
      {/if}
    </div>
  {/if}

  <button class="pulse btn row v-center c-waterloo mrg-xl mrg--r mrg--l" on:click={onPulseClick}>
    Pulse insight
    <Toggle isActive={insight.isPulse} class="mrg-s mrg--l" />
  </button>

  <Publish
    {insight}
    {tags}
    {update}
    {updateInsight}
    {publishDraft}
    {requirements}
    {isDraft}
    {isSaving}
  />
</div>

<style lang="scss">
  .bottom {
    position: fixed;
    bottom: 0;
    right: calc(50% - 570px);
    background: linear-gradient(270deg, var(--white) 83%, transparent 100%);
    padding: 15px 0;
    padding-left: 80px;
  }

  .pulse {
    --color-hover: var(--black);
  }
</style>

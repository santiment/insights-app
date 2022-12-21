<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Toggle from 'webkit/ui/Toggle'
  import Tooltip from 'webkit/ui/Tooltip/svelte'
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

  function onNFTClick() {
    insight.isNFTBattle = !insight.isNFTBattle
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

  <button class="pulse btn row v-center c-waterloo mrg-xl mrg--l" on:click={onNFTClick}>
    NFT Battle

    <Tooltip position="top" align="center">
      <button slot="trigger" class="btn info">
        <Svg id="info" w="12" />
      </button>

      <div slot="tooltip" class="tooltip c-fiord">
        Santiment Holiday Insight competition. Win 1 of only 10 special NFTs that unlock three free
        months of Sanbase PRO alongside a lifetime 18% discount!
        <a href="/" class="link-pointer">Lean more</a>
      </div>
      <!--  TODO: Ask for a link and add it [@vanguard | 21 Dec, 2022]  -->
    </Tooltip>

    <Toggle isActive={insight.isNFTBattle} class="mrg-s mrg--l" />
  </button>

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
    right: 10%;
    background: linear-gradient(270deg, var(--white) 83%, transparent 100%);
    padding: 15px 0 32px;
    padding-left: 80px;
  }

  :global(.isMobile) .bottom,
  :global(.phone) .bottom,
  :global(.phone-xs) .bottom {
    bottom: 60px;
  }

  .pulse {
    --color-hover: var(--black);
  }

  .info {
    margin-left: 6px;
    --fill: var(--waterloo);
    --fill-hover: var(--black);
  }

  .tooltip {
    padding: 14px 20px;
    max-width: 260px;
  }
</style>

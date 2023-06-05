<script>
  import Tooltip from 'san-webkit/lib/ui/Tooltip/svelte'
  import Svg from 'san-webkit/lib/ui/Svg/svelte'

  export let disabled
  export let isPulse
  export let requirements
</script>

<Tooltip position="top" align="end" isEnabled={disabled}>
  <div slot="trigger">
    <slot />
  </div>

  <div slot="tooltip" class="requirements c-casper">
    <p class:active={requirements.title}>
      <Svg id="checkmark" w="8" h="6" />
      Title contains more than 5 characters
    </p>
    <p class:active={requirements.text}>
      <Svg id="checkmark" w="8" h="6" />
      Text contains more than 5 characters
    </p>
    {#if isPulse}
      <p class:active={requirements.pulse}>
        <Svg id="checkmark" w="8" h="6" />
        Text contains less than 150 words
      </p>
    {/if}
  </div>
</Tooltip>

<style>
  .requirements {
    padding: 15px;
    white-space: nowrap;
    fill: var(--casper);
  }
  p {
    margin: 8px 0;
    display: flex;
    align-items: center;
  }
  p :global(svg) {
    margin-right: 6px;
  }
  .active {
    fill: var(--green);
    color: var(--black);
  }
</style>

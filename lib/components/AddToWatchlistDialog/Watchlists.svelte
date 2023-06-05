<script>
  import Svg from 'san-webkit/lib/ui/Svg/svelte'
  import Tooltip from 'san-webkit/lib/ui/Tooltip/svelte'
  import Checkbox from 'san-webkit/lib/ui/Checkbox.svelte'

  export let watchlists
  export let loading
  export let selected = new Set()
  export let scrollNode

  function toggle(watchlist) {
    if (selected.has(watchlist)) selected.delete(watchlist)
    else selected.add(watchlist)
    selected = selected
  }
</script>

<div class="column" bind:this={scrollNode}>
  {#each watchlists as watchlist (watchlist.id)}
    {@const { name, isPublic } = watchlist}
    <div class="btn-ghost row v-center" on:click={() => toggle(watchlist)}>
      <Checkbox class="mrg-s mrg--r" isActive={selected.has(watchlist)} />
      {name}

      <Tooltip dark position="top" align="center" closeTimeout={0} scrollParent={scrollNode}>
        <span
          slot="trigger"
          class="publicity btn row v-centere mrg-a mrg--l"
          aria-label={isPublic ? 'public' : 'Private'}
        >
          <Svg id="eye{isPublic ? '' : '-crossed'}" w="16" />
        </span>

        <div slot="tooltip" class="tooltip caption">{isPublic ? 'Public' : 'Private'}</div>
      </Tooltip>
    </div>
  {:else}
    <div class="mrg-l mrg--b" class:loading>You don't have any watchlists</div>
  {/each}
</div>

<style>
  .column {
    max-height: 364px;
    overflow: auto;
    overflow-x: hidden;
  }

  .btn-ghost {
    --bg-hover: none;
  }

  .publicity {
    --fill: var(--casper);
    --fill-hover: var(--waterloo);
  }

  .tooltip {
    color: #fff;
  }
</style>

<script>
  import Svg from 'san-webkit/lib/ui/Svg/svelte'
  import Change, { formatPercentChange } from 'san-webkit/lib/ui/Change.svelte'
  import Area from 'san-webkit/lib/ui/MiniChart/Area.svelte'
  import Asset from './../../components/Asset.svelte'
  import { queryInsightRelatedProjectPrice } from './../../api/insights/project'
  import { watchlistsPreloader } from './../../components/AddToWatchlistDialog/index.svelte'
  import { startAddToWatchlistFlow } from './../../flow/watchlists'

  export let project

  let data = []
  const setData = (result) => (data = result)

  $: change = +project.change
  $: queryInsightRelatedProjectPrice(project.slug).then(setData)

  function formatPrice(value) {
    return +value.toFixed(value < 9 ? 6 : 2)
  }
</script>

<Asset asset={project} class="mrg-l mrg--t">
  <div class="top h4 mrg-xs mrg--b row v-center justify">
    $ {formatPrice(+project.priceUsd)}
    <Area
      id={project.slug}
      {data}
      width={64}
      height={29}
      valueKey="v"
      style="--color:var(--{change < 0 ? 'red' : 'lima'})"
    />
  </div>

  <div class="row v-center c-casper mrg-m mrg--b">
    <Change change={formatPercentChange(change)} class="mrg-xs mrg--r" />
    in last 7d
  </div>

  <div
    class="btn-2 btn--s"
    on:click={() => startAddToWatchlistFlow(project)}
    use:watchlistsPreloader
  >
    <Svg id="add-list" w="16" h="14" class="icon-3uGMiW" />
    Add to watchlist
  </div>
</Asset>

<style>
  .btn-2 {
    position: relative;
  }

  :global(.icon-3uGMiW) {
    fill: var(--casper);
    margin-right: 21px;
  }
</style>

<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Change, { formatPercentChange } from 'webkit/ui/Change.svelte'
  import Area from 'webkit/ui/MiniChart/Area.svelte'
  import Asset from '@cmp/Asset.svelte'
  import { queryInsightRelatedProjectPrice } from '@/api/insights/project'

  export let project

  let data = []
  const setData = (result) => (data = result)

  $: change = +project.change
  $: queryInsightRelatedProjectPrice(project.slug).then(setData)

  function formatPrice(value) {
    return +value.toFixed(value < 1 ? 6 : 2)
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
      style="--color:var(--{change < 0 ? 'red' : 'lima'})" />
  </div>

  <div class="row v-center c-casper mrg-m mrg--b">
    <Change change={formatPercentChange(change)} class="mrg-xs mrg--r" />
    in last 7d
  </div>

  <div class="btn-2 btn--s">
    <Svg id="add-list" w="16" h="14" class="$style.icon" />
    Add to watchlist
  </div>
</Asset>

<style>
  .btn-2 {
    position: relative;
  }

  .icon {
    fill: var(--casper);
    margin-right: 21px;
  }
</style>

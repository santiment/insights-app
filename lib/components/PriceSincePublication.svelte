<script context="module">
  import { offsetStartDate, queryPriceData } from './../api/insights/project'

  export function getPublishTimestamp(publishedAt) {
    return Date.parse(publishedAt)
  }

  export function queryPriceSincePublication(slug, publishedAt, query = queryPriceData) {
    const from = offsetStartDate(publishedAt)
    return query(slug, +from ? from.toISOString() : '', publishedAt)
  }
</script>

<script>
  import Change, { percentChange } from 'san-webkit/lib/ui/Change.svelte'
  import Chart from 'san-webkit/lib/ui/MiniChart/svelte'
  import ChartPointRef from 'san-webkit/lib/ui/MiniChart/PointRef.svelte'

  let className = ''
  export { className as class }
  export let width
  export let insight
  export let project = {}
  export let data
  export let publicationPrice

  let clientHeight

  $: ({ ticker, priceUsd } = project)
  $: publishTimestamp = getPublishTimestamp(insight.publishedAt)
  $: change = percentChange(publicationPrice, priceUsd)
</script>

{#if data}
  <div class="price c-waterloo column justify {className}">
    {ticker} price since publication
    <div class="chart fluid mrg-m mrg--t c-casper" bind:clientHeight>
      <Chart {data} {width} height={clientHeight} valueKey="v" let:points>
        <ChartPointRef
          {data}
          {points}
          stroke="var(--{change < 0 ? 'red' : 'lima'})"
          target={publishTimestamp}
        />
      </Chart>
    </div>

    {#if Number.isFinite(change)}
      <Change {change} class="change-10vAI8" />
    {/if}
  </div>
{/if}

<style>
  .price {
    text-align: center;
  }

  .chart {
    flex: 1;
  }

  :global(.change-10vAI8) {
    justify-content: flex-end;
  }
</style>

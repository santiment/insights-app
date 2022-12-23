<script>
  import Chart from 'webkit/ui/MiniChart/svelte'
  import { getRefCoordinates } from 'webkit/ui/MiniChart/PointRef.svelte'
  import { querySignalPrice } from './api'

  export let insight
  export let signal
  export let width = 193
  export let height = 65

  $: ({ publishedAt } = insight)
  $: ({ slug, metric, createdAt, performance, closeDate } = signal)

  function getOpenCloseData(data, points) {
    const { index, coordinates } = getRefCoordinates(data, points, Date.parse(createdAt))
    const result = { index, x: +coordinates[0] }

    if (closeDate) {
      const { index, coordinates } = getRefCoordinates(data, points, Date.parse(closeDate))
      result.closeIndex = index
      result.closeX = +coordinates[0]
    }

    return result
  }
</script>

{#await querySignalPrice(metric, slug, publishedAt) then data}
  <Chart {data} {width} {height} valueKey="v" class="$style.chart" let:points>
    {@const { index, x, closeIndex, closeX } = getOpenCloseData(data, points)}

    <polyline
      points={points.slice(index, closeIndex)}
      stroke="var(--{performance > 0 ? 'lima' : 'red'})"
    />

    <line x1={x} x2={x} y1="0" y2={height} />

    {#if closeX}
      <line x1={closeX} x2={closeX} y1="0" y2={height} />
      <polygon points="{closeX} 3.3, {closeX - 3} 0, {closeX + 3} 0" />
    {/if}

    <polygon points="{x} {height - 3.3}, {x - 3} {height}, {x + 3} {height}" />
  </Chart>
{/await}

<style>
  .chart {
    --color: var(--casper);
  }

  line {
    stroke: var(--waterloo);
    stroke-dasharray: 3 2;
  }

  line,
  polyline {
    fill: none;
    stroke-width: 2;
  }

  polygon {
    stroke: var(--fiord);
  }
</style>

<script>
  export let data = []
  export let points = []
  export let valueKey = 'priceUsd'
  export let width = 70
  export let height = 50

  $: points = getPoints(data)

  function getPoints(data) {
    const { length } = data
    if (length < 2) return []

    let min = data[0][valueKey]
    let max = data[0][valueKey]

    data.forEach((item) => {
      const value = item[valueKey]
      if (value < min) min = value
      if (value > max) max = value
    })

    if (min === max) min = 0

    const xAxisFactor = width / (length - 1)
    const yAxisFactor = height / (max - min)

    return data.map(
      (item, index) => `${index * xAxisFactor},${(max - item[valueKey]) * yAxisFactor}`,
    )
  }
</script>

{#if points}
  <svg viewBox="0 0 {width} {height}" {height}>
    <polyline points={points.join(' ')} />
    <slot />
  </svg>
{/if}

<style>
  svg {
    overflow: visible;
  }
  polyline {
    fill: none;
    stroke-width: 2;
    stroke: var(--casper);
  }
</style>

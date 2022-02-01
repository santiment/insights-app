<script>
  export let data
  export let change = 0
  export let width = 64,
    height = 29

  const changeColor = `--change: var(--${change > 0 ? 'lima' : 'red'})`
  const dataLength = data.length

  let min = data[0].priceUsd
  let max = data[0].priceUsd

  for (let i = 0; i < dataLength; i++) {
    const { priceUsd } = data[i]
    if (priceUsd < min) {
      min = priceUsd
    } else if (priceUsd > max) {
      max = priceUsd
    }
  }

  const xAxisFactor = width / dataLength
  const yAxisFactor = height / (max - min)

  const points = data.map(
    ({ priceUsd }, index) =>
      `${index * xAxisFactor},${(max - priceUsd) * yAxisFactor}`,
  )

  const [startX, startY] = points[0].split(',')
  const [lastX, lastY] = points[dataLength - 1].split(',')

  const linePoints = points.join(' ')

  const areaPoints = `${linePoints} ${lastX},${height} ${startX},${height}, ${startX},${startY}`
</script>

<template lang="pug">
svg(viewBox='0 0 {width} {height}', style='{changeColor};height:{height}px')
  defs
    linearGradient#negative-change(x1="0", x2="0", y1="0", y2="2")
      stop(offset='0%', stop-color='var(--red)', stop-opacity='0.3')
      stop(offset='60%', stop-color='var(--white)', stop-opacity='0')
    linearGradient#positive-change(x1="0", x2="0", y1="0", y2="2")
      stop(offset='0%', stop-color='var(--lima)', stop-opacity='0.3')
      stop(offset='60%', stop-color='var(--white)', stop-opacity='0')

  polyline.line(points='{linePoints}')
  polyline(points='{areaPoints}', class!='{change > 0 ? "positive" : "negative"}')
</template>

<style>
  svg {
    overflow: visible;
    fill: none;
  }

  .line {
    stroke-width: 2;
    stroke: var(--change);
  }

  .positive {
    fill: url(#positive-change);
  }
  .negative {
    fill: url(#negative-change);
  }
</style>

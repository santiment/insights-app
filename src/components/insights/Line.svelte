<script>
  export let data
  export let publishedIndex = 0
  export let publishedPrice = 0
  export let change
  export let minHeight = 0

  let points
  let chart
  let width = 0,
    height = 0

  let cx = 0,
    cy = 0

  $: if (minHeight) {
    height = height >= minHeight ? height : minHeight
  }

  let changeColor
  $: changeColor = `--change: var(--${change > 0 ? 'lima' : 'persimmon'})`

  $: if (data) {
    let min = data[0].priceUsd
    let max = data[0].priceUsd

    data.forEach(({ priceUsd }) => {
      if (priceUsd < min) {
        min = priceUsd
      }
      if (priceUsd > max) {
        max = priceUsd
      }
    })

    const maxX = data.length
    cx = (publishedIndex / maxX) * width
    cy = height - (publishedPrice / max) * height

    points = data
      .map(
        ({ priceUsd }, index) =>
          `${(index / maxX) * width},${
            height - (max && priceUsd / max) * height
          }`,
      )
      .join(' ')
  }
</script>

<template lang="pug">
+if('points')
  div(bind:clientWidth='{width}', bind:clientHeight='{height}', style='{changeColor}')
    svg(viewBox='0 0 {width} {height}', style='height:{height}px')
      polyline({points})
      circle({cx},{cy}, r="3.5")
</template>

<style>
  div {
    flex: 1;
    margin: 15px 0 0;
  }

  svg {
    overflow: visible;
    fill: none;
  }

  polyline {
    stroke-width: 2;
    stroke: var(--casper);
  }

  circle {
    fill: var(--white);
    stroke: var(--change);
    stroke-width: 1.5px;
  }
</style>

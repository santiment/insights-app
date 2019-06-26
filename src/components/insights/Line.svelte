<script>
  import { onMount } from 'svelte'

  export let data

  let points
  let chart
  let width = 0,
    height = 0

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

    points = data
      .map(
        ({ priceUsd }, index) =>
          `${(index / maxX) * width},${height -
            (max && priceUsd / max) * height}`,
      )
      .join(' ')
  }
</script>

<template>
  {#if points}
  <div
    bind:clientWidth="{width}"
    bind:clientHeight="{height}"
    style="flex: 1;font-size: 0;line-height:1;margin: 15px 0;"
  >
    <svg viewBox="0 0 {width} {height}" style="height:{height}; fill: none;">
      <polyline
        stroke-width="2"
        stroke="var(--casper)"
        fill="none"
        points="{points}"
      />
    </svg>
  </div>
  {/if}
</template>

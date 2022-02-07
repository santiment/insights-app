<script>
  import { getDateFormats } from 'webkit/utils/dates'

  export let items

  let lastDate

  function getDateAfter({ publishedAt }) {
    const { MMM, D } = getDateFormats(new Date(publishedAt))
    const date = MMM + ' ' + D
    return lastDate !== date ? (lastDate = date) : ''
  }
</script>

{#each items as item (item.id)}
  {@const date = getDateAfter(item)}
  {#if date}<h4 class="c-waterloo mrg-l mrg--b">{date}</h4>{/if}
  <slot {item} />
{/each}

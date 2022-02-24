<script>
  import { getDateFormats } from 'webkit/utils/dates'

  export let items

  $: DateById = getDateIds(items)

  function getDateIds(items) {
    const result = {}
    let lastDate
    items.forEach(({ id, publishedAt }) => {
      const { MMM, D } = getDateFormats(new Date(publishedAt))
      const date = MMM + ' ' + D
      if (lastDate === date) return
      result[id] = lastDate = date
    })
    return result
  }
</script>

{#each items as item (item.id)}
  {@const date = DateById[item.id]}
  {#if date}<h4 class="c-waterloo mrg-l mrg--b">{date}</h4>{/if}
  <slot {item} />
{/each}

<script>
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'

  export let items, cursoredSuggestion

  function onClick({ currentTarget }) {
    currentTarget.click()
  }

  function getLink(item) {
    return item.link || `/read/${getSEOLinkFromIdAndTitle(item.id, item.title)}`
  }
</script>

{#each items as item (item.id)}
  <a
    on:mousedown={onClick}
    href={getLink(item)}
    class:cursored={cursoredSuggestion === item}>{item.title}</a
  >
{/each}

<style lang="scss">
  a {
    display: flex;
    width: 100%;
    padding: 6px 8px;
    color: var(--rhino);
    height: auto;
    min-height: 32px;
    border-radius: 4px;

    &:hover {
      background: var(--athens);
    }

    &:hover,
    &:focus {
      color: var(--green);
    }
  }

  .cursored {
    background: var(--porcelain);
  }
</style>

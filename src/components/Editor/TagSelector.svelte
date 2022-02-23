<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { queryTags } from '@/api/tags'
  import Selector from './Selector.svelte'

  export let tags = []
  export let update

  let isOpened
  let allTags = []

  $: isEnabled = tags.length < 5

  if (process.browser) queryTags().then((data) => (allTags = data))

  function filter(value, items) {
    const searchTerm = value.toLowerCase()
    return items.filter((item) => item.toLowerCase().includes(searchTerm))
  }
  function selectTag(item) {
    if (tags.length >= 5) return

    tags = Array.from(new Set(tags.concat(item)))
    isOpened = false
    update()
  }

  function deleteTag(tag) {
    tags = tags.filter((v) => v !== tag)
    update()
  }
</script>

<Selector bind:isOpened {isEnabled} {filter} items={allTags}>
  <div class="tags row">
    {#each tags as tag (tag)}
      <span class="tag border caption">
        {tag}
        <button class="close btn" on:click|stopPropagation={() => deleteTag(tag)}>
          <Svg id="close-small" w="6" class="$style.icon" />
        </button>
      </span>
    {:else}
      <div class="c-casper">Add a tag...</div>
    {/each}
  </div>

  <div slot="item" let:item class="btn-ghost" on:click={() => selectTag(item)}>
    {item}
  </div>
</Selector>

<style>
  .tooltip {
    padding: 8px;
    left: unset !important;
    top: unset !important;
    right: 0;
    bottom: 40px;
  }

  .tags {
    margin-top: -3px;
    flex-wrap: wrap;
  }
  .tag {
    --border: var(--porcelain);
    margin-right: 4px;
    padding: 2px 4px;
    margin: 3px 4px 0 0;
  }
  .c-casper {
    margin-top: 3px;
  }

  .close {
    margin-left: 2px;
    padding: 0 2px;
    --fill: var(--waterloo);
    --fill-hover: var(--red);
  }

  .icon {
    margin: -2px 0 0;
  }
</style>

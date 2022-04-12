<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Tooltip from 'webkit/ui/Tooltip/svelte'
  import List from 'webkit/ui/VirtualList/Searchable.svelte'

  let className = ''
  export { className as class }
  export let key
  export let items
  export let filter
  export let isOpened
  export let placeholder = 'Search tags'
  export let isEnabled
</script>

<div class="relative">
  <Tooltip
    bind:isOpened
    {isEnabled}
    on="click"
    class="$style.tooltip fluid"
    activeClass="$style.active"
  >
    <div slot="trigger" class="btn input row justify v-center {className}">
      <slot />

      <Svg id="arrow" w="8" h="4.5" />
    </div>

    <svelte:fragment slot="tooltip">
      <List
        searchPosition="bottom"
        {key}
        {items}
        {placeholder}
        defaultItemHeight={32}
        maxHeight={200}
        autofocus
        {filter}
        let:item
      >
        <slot name="item" {item} />
      </List>
    </svelte:fragment>
  </Tooltip>
</div>

<style>
  .tooltip {
    padding: 8px;
    left: unset !important;
    top: unset !important;
    right: 0;
    bottom: 40px;
  }

  .input {
    min-height: 34px;
  }

  .active {
    --border: var(--green);
  }
</style>

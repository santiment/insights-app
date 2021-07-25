<script>
  import Icon from '@/ui/Icon.svelte'

  export let id

  const santimentEditorialIds = [6, 7, 1269, 3031, 4522]
  const isSantimentEditor = santimentEditorialIds.includes(+id)
</script>

{#if isSantimentEditor}
<div class="wrapper">
  <Icon id="editorial" w="99" h="28" />
</div>
{/if}

<style lang="scss">
  @import '@/variables';

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $jungle-green-light;
    border-radius: 12px;
    width: 118px;
    height: 40px;
  }
</style>

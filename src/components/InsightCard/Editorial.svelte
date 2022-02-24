<script>
  import Svg from 'webkit/ui/Svg/svelte'

  export let user

  const SANTIMENT = new Set([6, 7, 1269, 3031, 4522])
</script>

{#if SANTIMENT.has(+user.id)}
  <Svg illus id="editorial" w="118" h="40" class="mrg-a mrg--l $style.icon" />
{/if}

<style>
  .icon {
    min-width: 118px;
  }
</style>

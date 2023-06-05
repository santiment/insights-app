<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { checkIsNFTTag } from '@/utils/insights'
  import NftBattle from './NftBattle.svelte'

  export let user
  export let tags

  $: isMobile = false
  $: isNftBattle = (tags || []).some((tag) => tag && checkIsNFTTag(tag.name))

  const SANTIMENT = new Set([6, 7, 1269, 3031, 4522, 79570])
</script>

{#if isNftBattle}
  <NftBattle />
{:else if SANTIMENT.has(+user.id)}
  {#if isMobile}
    <Svg illus id="editorial-mobile" w="40" class="mrg-a mrg--l" />
  {:else}
    <Svg illus id="editorial" w="118" h="40" class="mrg-a mrg--l $style.icon" />
  {/if}
{/if}

<style>
  .icon {
    min-width: 118px;
  }
</style>

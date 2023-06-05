<script>
  import Svg from 'san-webkit/lib/ui/Svg/svelte'
  import { NFT_BATTLE_TAG } from './../../utils/insights'
</script>

<a
  href="https://insights.santiment.net/?tags={NFT_BATTLE_TAG.toLowerCase()}"
  class="row btn hv-center mrg-a mrg--l"
>
  <Svg id="nft" w="15" class="mrg-s mrg--r" />
  NFTBattle
</a>

<style>
  a {
    --color: var(--purple);
    --bg: var(--purple-light-1);
    padding: 8px 12px;
  }
</style>

<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import LikeBtn from 'webkit/ui/LikeButton/svelte'
  import Tags from '@cmp/Tags.svelte'

  export let insight

  $: ({ votes, tags, isPro } = insight)
</script>

<div class="bottom row v-center c-waterloo">
  <LikeBtn totalVotes={votes.totalVotes} userVotes={votes.currentUserVotes} />

  <a href="/" class="comment btn-2 mrg-m mrg--l">
    <Svg id="comment" w="16" h="14" class="mrg-xs mrg--r" />
    0
  </a>

  <div class="c-waterloo mrg-a mrg--l caption">
    <Tags {tags} />
  </div>

  {#if isPro}
    <Svg id="crown" w="12" h="9" class="$style.crown" />
  {/if}
</div>

<style>
  .bottom {
    border-top: 1px solid var(--porcelain);
    padding: 12px 16px 12px 24px;
  }

  .comment {
    padding: 5px 12px;
    border-radius: 20px;
    fill: var(--waterloo);
  }

  .crown {
    fill: var(--orange);
    margin-left: 20px;
  }
</style>

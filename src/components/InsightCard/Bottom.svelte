<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import LikeBtn from 'webkit/ui/LikeButton/svelte'
  import Tags from '@cmp/Tags.svelte'

  export let insight
  export let href

  $: ({ votes, tags, commentsCount, isPro } = insight)
</script>

<div class="bottom row v-center c-waterloo">
  <LikeBtn totalVotes={votes.totalVotes} userVotes={votes.currentUserVotes} />

  <a href="{href}?_wc=1#comments" class="comment btn-2 mrg-m mrg--l" sapper:prefetch>
    <Svg id="comment" w="16" h="14" class="mrg-xs mrg--r" />
    {commentsCount}
  </a>

  <div class="tags c-waterloo mrg-a mrg--l caption row">
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
    white-space: nowrap;
  }

  .crown {
    fill: var(--orange);
    margin-left: 20px;
  }

  .tags {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
</style>

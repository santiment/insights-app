<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import CommentBtn from '@cmp/CommentButton.svelte'
  import VoteButton from '@cmp/VoteButton.svelte'
  import Tags from '@cmp/Tags.svelte'

  export let insight
  export let href
  export let source

  $: ({ id, tags, commentsCount, isPro } = insight)
</script>

<div class="bottom row v-center c-waterloo">
  <VoteButton {insight} {source} />

  <CommentBtn {id} {href} {source} count={commentsCount} />

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

  .crown {
    fill: var(--orange);
    margin-left: 20px;
  }

  .tags {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
</style>

<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import CommentBtn from '@cmp/CommentButton.svelte'
  import VoteButton from '@cmp/VoteButton.svelte'
  import Tags from '@cmp/Tags.svelte'
  import { session } from '@/stores/session'

  export let insight
  export let href
  export let source

  $: ({ id, tags, commentsCount, isPro } = insight)
  $: isMobile = $session.isMobile
</script>

<div class="bottom row justify v-center c-waterloo">
  <div class="row v-center">
    <VoteButton {insight} {source} />

    <CommentBtn {id} {href} {source} count={commentsCount} />
  </div>

  <div class="row v-center">
    <div class="tags c-waterloo mrg-a mrg--l caption row">
      <Tags {tags} {isPro} shouldSliceTags={isMobile} />
    </div>
    {#if isPro}
      <Svg id="crown" w="12" h="9" class="$style.crown" />
    {/if}
  </div>
</div>

<style lang="scss">
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
    gap: 4px;
  }

  :global(body:not(.desktop)) {
    .bottom {
      padding: 12px 20px;
      gap: 16px;
    }

    .crown {
      margin-left: 12px;
    }

    .tags {
      gap: 8px;
    }
  }
</style>

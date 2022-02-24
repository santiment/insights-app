<script>
  import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
  import Svg from 'webkit/ui/Svg/svelte'

  let className = ''
  export { className as class }
  export let insight

  $: ({ id, title, user, isPro } = insight)
</script>

<div class="column {className}">
  <a href="/read/{getSEOLinkFromIdAndTitle(id, title)}" class="title body-2 mrg-xs mrg--b"
    >{title}</a>
  <a href="https://app.santiment.net/profile/{user.id}" class="user c-waterloo"
    >@{user.username}
  </a>
  {#if isPro}<Svg id="crown" w="12" h="9" class="$style.crown mrg-a mrg--l" />{/if}
</div>

<style>
  .column {
    position: relative;
  }

  .title,
  .user {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user {
    padding-right: 30px;
  }

  .title {
    white-space: pre-line;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .crown {
    position: absolute;
    fill: var(--orange);
    bottom: 5px;
    right: 0;
  }
</style>

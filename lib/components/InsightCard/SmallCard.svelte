<script>
  import { getSEOLinkFromIdAndTitle } from 'san-webkit/lib/utils/url'
  import Svg from 'san-webkit/lib/ui/Svg/svelte'
  import { trackProfileClick } from 'san-webkit/lib/analytics/events/interaction'

  let className = ''
  export { className as class }
  export let insight
  export let source

  $: ({ id, title, user, isPro } = insight)

  function onAuthorClick() {
    const { id, username } = user
    trackProfileClick({ id, username, source, feature: 'insight' })
  }
</script>

<div class="column {className}">
  <a href="/read/{getSEOLinkFromIdAndTitle(id, title)}" class="title body-2 mrg-xs mrg--b">
    {title}
  </a>
  <a
    href="https://app.santiment.net/profile/{user.id}"
    class="user c-waterloo"
    on:click={onAuthorClick}
    >@{user.username}
  </a>
  {#if isPro}<Svg id="crown" w="12" h="9" class="crown-TOV_WF mrg-a mrg--l" />{/if}
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

  :global(.crown-TOV_WF) {
    position: absolute;
    fill: var(--orange);
    bottom: 5px;
    right: 0;
  }
</style>

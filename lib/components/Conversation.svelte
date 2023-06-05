<script>
  import { goto } from '@sapper/app'
  import { getSEOLinkFromIdAndTitle } from 'san-webkit/lib/utils/url'
  import Profile from 'san-webkit/lib/ui/Profile/svelte'
  import { markdownToPlainText } from 'san-webkit/lib/ui/Editor/markdown'

  let className = ''
  export { className as class }
  export let conversation

  $: ({ user, content, insight } = conversation)

  function onClick() {
    const { id, title } = insight
    goto('/read/' + getSEOLinkFromIdAndTitle(id, title))
  }
</script>

<div class="border btn {className}" on:click={onClick}>
  <div class="row">
    <Profile {user} class="mrg-m mrg--r" />
    <div class="caption mrg-a mrg--l">Insights</div>
  </div>

  <div class="comment mrg-s mrg--t mrg--b">{markdownToPlainText(content)}</div>
  <div class="title c-waterloo">{insight.title}</div>
</div>

<style>
  .btn {
    padding: 12px 16px;
    --bg-hover: var(--athens);
    --img-size: 24px;
  }

  .caption {
    padding: 4px 8px;
    background: var(--orange-light-1);
  }

  .title,
  .comment {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .comment {
    white-space: pre-line;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>

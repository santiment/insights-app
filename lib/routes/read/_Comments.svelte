<script>
  import Comments from 'san-webkit/lib/ui/Comments/svelte'
  import { CommentsType } from 'san-webkit/lib/api/comments'
  import { mutateStoreUserActivitiy, InteractionType } from './../../api/userActivity'
  import { currentUser } from './../../stores/user'
  import { session } from './../../stores/session'

  export let insight

  $: isMobile = $session.isMobile
</script>

<div id="comments" class={isMobile ? 'body-2' : ''}>
  <Comments
    type={CommentsType.Insight}
    commentsFor={insight}
    currentUser={$currentUser}
    titleClass="{isMobile ? 'body-1' : 'h4'} c-waterloo"
    onCommentSubmitted={() => mutateStoreUserActivitiy(insight.id, InteractionType.COMMENT)}
  />
</div>

<style lang="scss">#comments {
  margin-top: 40px;
}
#comments :global(form) {
  margin-bottom: 30px;
}
#comments :global(form) :global(button) {
  height: 40px;
  flex: 0 0 92px;
  white-space: nowrap;
}
#comments :global(form) > :global(div) {
  min-height: 40px;
  padding: 9px 12px;
}

:global(body:not(.desktop)) #comments {
  max-width: calc(100vw - 40px);
  margin-top: 64px;
}
:global(body:not(.desktop)) #comments :global(form) {
  margin: 24px 0 48px;
}
:global(body:not(.desktop)) #comments :global(form) > :global(div) {
  padding: 7px 10px;
}
:global(body:not(.desktop)) #comments :global(form) :global(button) {
  flex: 0 0;
  justify-content: center;
  margin-left: 12px;
}
:global(body:not(.desktop)) #comments > :global(div) {
  margin: 0;
  flex: auto;
  padding: 0;
}</style>

<script>
  import Comments from 'webkit/ui/Comments/svelte'
  import { CommentsType } from 'webkit/api/comments'
  import { mutateStoreUserActivitiy, InteractionType } from '@/api/userActivity'
  import { currentUser } from '@/stores/user'

  export let insight
</script>

<div id="comments">
  <Comments
    type={CommentsType.Insight}
    commentsFor={insight}
    currentUser={$currentUser}
    titleClass="h4 c-waterloo"
    onCommentSubmitted={() => mutateStoreUserActivitiy(insight.id, InteractionType.COMMENT)}
  />
</div>

<style lang="scss">
  #comments {
    margin-top: 40px;

    :global {
      form {
        margin-bottom: 30px;
      }

      form button {
        height: 40px;
        flex: 0 0 92px;
        white-space: nowrap;
      }

      form > div {
        min-height: 40px;
        padding: 9px 12px;
      }
    }
  }
</style>

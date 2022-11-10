<script>
  import Comments from 'webkit/ui/Comments/svelte'
  import { CommentsType } from 'webkit/api/comments'
  import { mutateStoreUserActivitiy, InteractionType } from '@/api/userActivity'
  import { currentUser } from '@/stores/user'
  import { session } from '@/stores/session'

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

  :global(body:not(.desktop)) {
    #comments {
      max-width: calc(100vw - 40px);
      margin-top: 64px;

      :global {
        form {
          margin: 24px 0 48px;
        }

        form > div {
          min-height: 40px;
          padding: 7px 10px;
        }

        form button {
          height: 40px;
          flex: 0 0;
          justify-content: center;
          margin-left: 12px;
          white-space: nowrap;
        }

        > div {
          margin: 0;
          flex: auto;
          padding: 0;
        }
      }
    }
  }
</style>

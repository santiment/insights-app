<script>
  import LikeBtn from 'webkit/ui/LikeButton/svelte'
  import { currentUser } from '@/stores/user'
  import { InteractionType, mutateStoreUserActivitiy } from '@/api/userActivity'

  export let insight
  export let source

  $: ({ id, votes } = insight)
  function onVoted() {
    mutateStoreUserActivitiy(id, InteractionType.UPVOTE)
  }
</script>

<LikeBtn {id} {source} {onVoted} type="insightId" disabled={!$currentUser} bind:votes />

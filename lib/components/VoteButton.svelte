<script>
  import LikeBtn from 'san-webkit/lib/ui/LikeButton/svelte'
  import { InteractionType, mutateStoreUserActivitiy } from './../api/userActivity'

  let className = ''
  export { className as class }
  export let insight
  export let source
  export let currentUser

  $: ({ id, votes } = insight)
  function onVoted() {
    mutateStoreUserActivitiy(id, InteractionType.UPVOTE)
  }
</script>

<LikeBtn
  {id}
  {source}
  {onVoted}
  type="insightId"
  disabled={!currentUser}
  bind:votes
  class={className}
/>

<script>
  import { vote, VoteType } from 'webkit/api/vote'
  import LikeBtn from 'webkit/ui/LikeButton/svelte'
  import { currentUser } from '@/stores/user'
  import { InteractionType, storeUserActivitiy } from '@/api/userActivity'

  export let insight

  $: ({ id, votes } = insight)
  function onVote() {
    vote(id, VoteType.Insight)
      .then(() => storeUserActivitiy(id, InteractionType.UPVOTE))
      .catch(() => {
        votes.totalVotes -= 1
        votes.userVotes -= 1
      })
  }
</script>

<LikeBtn
  {onVote}
  disabled={!$currentUser}
  totalVotes={votes.totalVotes}
  userVotes={votes.currentUserVotes}
/>

<script>
  import { vote, VoteType } from 'webkit/api/vote'
  import LikeBtn from 'webkit/ui/LikeButton/svelte'
  import { currentUser } from '@/stores/user'

  export let insight

  $: ({ id, votes } = insight)
  function onVote() {
    vote(id, VoteType.Insight).catch(() => {
      votes.totalVotes -= 1
      votes.userVotes -= 1
    })
  }
</script>

<LikeBtn
  {onVote}
  disabled={!$currentUser}
  totalVotes={votes.totalVotes}
  userVotes={votes.currentUserVotes} />

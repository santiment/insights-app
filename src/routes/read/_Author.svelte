<script>
  import Profile from 'webkit/ui/Profile/index.svelte'
  import FollowButton from 'webkit/ui/FollowButton/svelte'
  import { currentUser } from '@/stores/user'

  export let user, date
  export let isAuthor
  export let isFollowing
  export let source
</script>

<div class="row v-center justify">
  <Profile {user} feature="insight" {source}>
    <div class="caption c-waterloo">{date}</div>
  </Profile>

  {#if !isAuthor}
    <FollowButton {isFollowing} {user} currentUser={$currentUser} />
  {/if}
</div>

<script>
  import Profile from 'san-webkit/lib/ui/Profile/index.svelte'
  import FollowButton from 'san-webkit/lib/ui/FollowButton/svelte'
  import { currentUser } from './../../stores/user'
  import { session } from './../../stores/session'

  export let user, date
  export let isAuthor
  export let isFollowing
  export let source

  $: isMobile = $session.isMobile
</script>

<div class="row v-center justify">
  <Profile {user} feature="insight" {source} class="profile-2nCxRY {isMobile ? 'txt-m' : ''}">
    <div class="{isMobile ? 'body-3' : 'caption'} txt-r c-waterloo">{date}</div>
  </Profile>

  {#if !isAuthor}
    <FollowButton
      {isFollowing}
      {user}
      currentUser={$currentUser}
      class="follow-1Tn2-o {isMobile ? 'body-2' : ''}"
    />
  {/if}
</div>

<style lang="scss">:global(body:not(.desktop)) :global(.profile-2nCxRY) {
  --img-size: 40px;
}
:global(body:not(.desktop)) :global(.follow-1Tn2-o) {
  padding: 8px 12px;
}</style>

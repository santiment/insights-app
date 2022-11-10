<script>
  import Profile from 'webkit/ui/Profile/index.svelte'
  import FollowButton from 'webkit/ui/FollowButton/svelte'
  import { currentUser } from '@/stores/user'
  import { session } from '@/stores/session'

  export let user, date
  export let isAuthor
  export let isFollowing

  $: isMobile = $session.isMobile
</script>

<div class="row v-center justify">
  <Profile {user} class="$style.profile {isMobile ? 'txt-m' : ''}">
    <div class="{isMobile ? 'body-3' : 'caption'} txt-r c-waterloo">{date}</div>
  </Profile>

  {#if !isAuthor}
    <FollowButton
      {isFollowing}
      {user}
      currentUser={$currentUser}
      class="$style.follow {isMobile ? 'body-2' : ''}"
    />
  {/if}
</div>

<style lang="scss">
  :global(body:not(.desktop)) {
    .profile {
      --img-size: 40px;
    }

    .follow {
      padding: 8px 12px;
    }
  }
</style>

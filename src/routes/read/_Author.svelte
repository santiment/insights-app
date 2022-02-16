<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Profile from 'webkit/ui/Profile/index.svelte'
  import { startFollowFlow } from '@/flow/follow'

  export let user, date
  export let isFollowing

  function onFollow() {
    startFollowFlow(user.id)
  }
</script>

<div class="row v-center justify">
  <Profile {user}>
    <div class="caption c-waterloo">{date}</div>
  </Profile>

  <div class="btn-1 btn--s" on:click={onFollow}>
    {#if isFollowing}
      Following
    {:else}
      <Svg id="follow" w="18" h="16" class="mrg-xs mrg--r" />
      Follow
    {/if}
  </div>
</div>

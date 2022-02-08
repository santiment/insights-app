<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Profile from 'webkit/ui/Profile/index.svelte'

  export let user, date
</script>

<div class="row v-center justify">
  <Profile {user}>
    <div class="caption c-waterloo">{date}</div>
  </Profile>

  <div class="btn-1 btn--s">
    <Svg id="follow" w="18" h="16" class="mrg-xs mrg--r" />
    Follow
  </div>
</div>

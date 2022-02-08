<script>
  import Profile from 'webkit/ui/Profile/index.svelte'

  export let user, date
</script>

<div class="row v-center justify">
  <Profile {user}>
    <div class="caption c-waterloo">{date}</div>
  </Profile>

  <div class="btn-1 btn--s">Follow</div>
</div>

<script>
  import Svg from 'webkit/ui/Svg/svelte'
</script>

<div class="menu column hv-center body-1">
  <a class="" href="https://app.santiment.net/alerts">Alerts</a>
  <a class="" href="https://app.santiment.net/labs/trends">Social trends</a>
  <a class="" href="https://app.santiment.net/account">Account settings</a>

  <a href="/login" class="btn-1 row hv-center">Log in</a>
  <a href="/sign-up" class="btn-2 row hv-center">Create an account</a>
</div>

<style>
  .menu {
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--white);
    padding: 15vh 16px 105px;
  }

  .btn-1,
  .btn-2 {
    height: 40px;
    font-size: 16px;
    width: 100%;
  }
</style>

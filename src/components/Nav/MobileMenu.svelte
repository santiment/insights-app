<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { currentUser } from '@/stores/user'
</script>

<div class="menu column hv-center body-1">
  <Svg illus id="santiment" w="145" h="26" class="$style.logo" />

  <div class="links column">
    <a class="link" href="https://app.santiment.net/alerts">Alerts</a>
    <a class="link" href="https://app.santiment.net/labs/trends">Social trends</a>
    <a class="link" href="https://app.santiment.net/account">Account settings</a>
    <button class="link" on:click={() => window.Intercom && window.Intercom('show')}
      >Support</button>
  </div>

  {#if !$currentUser}
    <div class="bottom column">
      <a href="/login" class="btn-1 row hv-center">Log in</a>
      <a href="/sign-up" class="btn-2 row hv-center mrg-xl mrg--t">Create an account</a>
    </div>
  {/if}
</div>

<style>
  .menu {
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--white);
    padding: 15vh 16px 80px;
  }

  .logo {
    margin: 0 auto 17vh;
  }

  .btn-1,
  .btn-2 {
    height: 40px;
    font-size: 16px;
    width: 100%;
  }

  .link {
    margin-bottom: 32px;
    text-align: center;
  }

  .bottom {
    width: 80%;
    margin-top: auto;
  }
</style>

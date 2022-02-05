<script>
  import Tooltip from 'webkit/ui/Tooltip/svelte'
  import Svg from 'webkit/ui/Svg/svelte'
  import Toggle from 'webkit/ui/Toggle.svelte'
  import Pic from 'webkit/ui/Profile/Pic.svelte'
  import { ui } from '@/stores/ui'
  import { currentUser } from '@/stores/user'
  import AccountInfo from './AccountInfo.svelte'

  function onLogout() {
    // startLogoutFlow(session).then(() => (isOpened = false))
  }
</script>

<a href="/login" class="caption c-waterloo">Sign in</a>

<Tooltip activeClass="$style.active" align="center" isOpened closeTimeout={99999999}>
  <svelte:fragment slot="trigger">
    <Pic class="btn mrg-m mrg--l $style.pic" />
  </svelte:fragment>

  <div class="tooltip" slot="tooltip">
    {#if $currentUser}
      <AccountInfo user={$currentUser} />
      <hr />

      <section>
        <a class="btn btn--ghost" href="https://app.santiment.net/sonar/my-signals"> My signals </a>
        <a class="btn btn--ghost" href="https://app.santiment.net/watchlists"> My watchlists </a>
        <a class="btn btn--ghost" href="/my"> My insights </a>
        <a href="/new" class="write btn-1 btn--s">Write insight</a>
      </section>
      <hr />
    {/if}

    <section>
      <div class="btn btn--ghost" on:click={ui.toggleNightMode}>
        Night mode
        <Toggle isActive={$ui.nightMode} />
      </div>

      {#if $currentUser}
        <a href="https://app.santiment.net/labs" class="btn btn--ghost">Labs</a>
        <a href="https://app.santiment.net/account" class="btn btn--ghost">Account Settings</a>
        <div class="btn btn--ghost" on:click={() => window.Intercom && window.Intercom('show')}>
          Contact us
        </div>
        <div class="btn btn--ghost logout" on:click={onLogout}>
          <Svg id="logout" w="16" class="mrg-s mrg--r" /> Logout
        </div>
      {:else}
        <a href="/login" class="btn btn--ghost">Login</a>
      {/if}
    </section>
  </div>
</Tooltip>

<style>
  .pic {
    --img-bg: var(--green-light-1);
    --img-fill: var(--green);
  }

  .active {
    box-shadow: inset 0px 0px 0px 1px var(--green);
  }

  hr {
    background: var(--porcelain);
    height: 1px;
    border: none;
  }

  .write {
    display: inline-block;
    margin: 6px 0 0 8px;
  }

  .btn--ghost {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tooltip {
    width: 260px;
  }

  section {
    padding: 8px;
  }

  .logout {
    --color: var(--red);
    --color-hover: var(--red-hover);
    justify-content: initial;
  }
</style>

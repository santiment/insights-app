<script>
  import Tooltip from 'webkit/ui/Tooltip/svelte'
  import Toggle from 'webkit/ui/Toggle.svelte'
  import Pic from 'webkit/ui/Profile/Pic.svelte'
  import { ui } from '@/stores/ui'
</script>

<a href="/login" class="caption c-waterloo">Sign in</a>

<Tooltip activeClass="$style.active" align="center" isOpened closeTimeout={99999999}>
  <svelte:fragment slot="trigger">
    <Pic class="btn mrg-m mrg--l $style.pic" />
  </svelte:fragment>

  <div class="tooltip" slot="tooltip">
    <section>
      <div class="btn btn--ghost" on:click={ui.toggleNightMode}>
        Night mode
        <Toggle isActive={$ui.nightMode} />
      </div>
      <a href="/login" class="btn btn--ghost">Login</a>
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
</style>

<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import InputWithIcon from 'webkit/ui/InputWithIcon.svelte'
  import { session } from '@/stores/session'

  let isVisible = true
  let loading = false

  function onSubmit({ currentTarget }) {
    const email = currentTarget.email.value
  }
</script>

{#if $session.isDesktop && isVisible}
  <div class="banner border box">
    <div class="close btn" on:click={() => (isVisible = !isVisible)}>
      <Svg id="close" w="12" />
    </div>

    <div class="txt-m">Want more crypto insights?</div>
    <p class="caption c-waterloo">Subscribe to Santiment’s weekly market Digest!</p>

    <form on:submit|preventDefault={onSubmit}>
      <InputWithIcon big type="email" name="email" icon="envelope" w="12" placeholder="Your email">
        <button type="submit" class="btn-1" class:loading>Subscribe</button>
      </InputWithIcon>
    </form>
  </div>
{/if}

<style lang="scss">
  .banner {
    width: 380px;
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 0;
    z-index: 10;
    padding: 24px;
    text-align: left;
    background: var(--athens);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      opacity: 0.25;
      background: url('/overview_banner.svg') no-repeat 100%;
      background-size: 240%;
      z-index: -1;
    }
  }

  p {
    color: var(--waterloo);
    margin: 8px 0 20px;
  }

  button {
    margin-right: 3px;
  }

  .close {
    --fill: var(--waterloo);
    --fill-hover: var(--black);
    position: absolute;
    top: 7px;
    right: 10px;
  }
</style>

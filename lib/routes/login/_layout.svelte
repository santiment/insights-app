<script context="module">
  import { redirectLoggedInUser } from './../../flow/redirect'

  export function preload(_, session) {
    redirectLoggedInUser(this, session)
  }
</script>

<div class="row hv-center">
  <slot />
</div>

<style>
  .row {
    height: 100%;
  }

  .row::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background: url('/login-bg.svg') no-repeat 50% / contain;
  }
</style>

<script>
  import { ui } from '@/stores/ui'
</script>

<div class="column hv-center txt-center">
  <img
    class="mrg--b mrg-xl"
    src={$ui.nightMode ? 'binoculars-dark.svg' : 'binoculars.svg'}
    alt="empty"
  />
  <h6 class="body-1 mrg--b mrg-s txt-m">No Insights yet</h6>
  <p class="body-2 mrg--b mrg-l">
    Use Insights to journal your ideas, perform research, or share with others
  </p>
  <a href="/new" class="btn-1 v-center" sapper:prefetch>Add insight</a>
</div>

<style>
  div {
    width: 480px;
    padding-top: 50px;
    margin: auto;
    max-width: 100%;
  }

  img {
    max-width: 100%;
    width: 300px;
    height: 140px;
  }

  h6 {
    color: var(--rhino);
  }

  p {
    max-width: 358px;
    color: var(--fiord);
  }

  a {
    display: inline-flex;
    height: 32px;
  }
</style>

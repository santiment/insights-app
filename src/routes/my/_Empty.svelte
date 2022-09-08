<script>
  import { ui } from '@/stores/ui'
</script>

<div class="column hv-center txt-center">
  <img src={$ui.nightMode ? 'empty-dark.svg' : 'empty.svg'} alt="empty" />
  <p>Use Insights to journal your ideas, perform research, or share with others</p>
  <br />
  <a href="/new" class="btn-1 mrg-xl mrg--t v-center" sapper:prefetch>Add insight</a>
</div>

<style>
  div {
    width: 480px;
    padding-top: 50px;
    margin: auto;
    max-width: 100%;
  }

  p {
    margin-top: 30px;
    max-width: 358px;
  }

  a {
    display: inline-flex;
    height: 32pxgi;
  }
</style>

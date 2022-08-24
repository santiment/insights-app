<script>
  import Svg from 'webkit/ui/Svg/svelte'
</script>

<div>
  <p>
    Use Insights to journal your ideas, perform research, or share with others. Record your trades
    or research notes, and learn more about your investing style, track your progress over time.
    Build your reputation and educate yourself at the same time!
  </p>
  <br />
  <a href="/new" class="btn-1 mrg-xl mrg--t v-center" sapper:prefetch>
    <Svg id="plus-circle" w="16" class="mrg-s mrg--r" />
    Write your first insight
  </a>
</div>

<style>
  div {
    height: 212px;
    background: url('/empty-page.svg') no-repeat 50% 0;
    width: 480px;
    padding-top: 200px;
    margin: auto;
    text-align: center;
    max-width: 100%;
  }
  :global(.night-mode) div {
    height: 227px;
    background-image: url('/empty-page_dark.svg');
  }

  p {
    margin-top: 30px;
  }

  a {
    display: inline-flex;
  }
</style>

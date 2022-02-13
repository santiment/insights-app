<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Metamask from './Metamask.svelte'
  import Divider from './Divider.svelte'

  let className = ''
  export { className as class }
</script>

<section class="border {className}">
  <h2 class="h3 mrg-xxl mrg--b">Welcome to Insights</h2>

  <Metamask />

  <Divider />

  <div class="btn-2 btn--l">
    <Svg id="email" w="16" h="12" class="$style.icon" />
    Log in with Email
  </div>
  <div class="btn-2 btn--l">
    <img src="/webkit/icons/google.svg" alt="Google" class="$style.icon" /> Sign in with Google
  </div>
  <div class="btn-2 btn--l">
    <img src="/webkit/icons/twitter.svg" alt="Twitter" class="$style.icon" /> Sign in with Twitter
  </div>

  <div class="body-2 c-waterloo mrg-xl mrg--t">
    New to Santiment?
    <a href="/sign-up" class="btn">Create an account</a>
  </div>
</section>

<style>
  section {
    padding: 39px 99px;
    text-align: center;
  }

  .btn-2 {
    margin: 0 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a {
    --color: var(--green);
    --color-hover: var(--green-hover);
  }

  .icon {
    margin-right: 8px;
    fill: var(--casper);
  }
</style>

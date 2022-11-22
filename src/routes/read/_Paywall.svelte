<script>
  import { goto } from '@sapper/app'
  import { showPaymentDialog, dataPreloader } from 'webkit/ui/PaymentDialog/index.svelte'
  import { currentUser } from '@/stores/user'
  // import { showPaymentDialog, dataPreloader } from '@cmp/PaymentDialog/index.svelte'

  function onUpgradeClick() {
    if (!$currentUser) {
      // postponePayment()
      return goto('/login')
    }

    showPaymentDialog({
      source: 'insights-article-paywall',
    })
  }
</script>

<section class="top mrg-xxl mrg--t">
  <h2 class="h4 txt-m mrg-s mrg--b">There’s more of this Insight</h2>
  <h3 class="c-waterloo mrg-xxl mrg--b">Choose your subscription plan</h3>

  <div class="plan border">
    <div class="body-1 mrg-s mrg--b">Sanbase PRO</div>
    <div class="c-waterloo mrg-l mrg--b">Unlock all PRO insights</div>
    <div class="h3 mrg-xl mrg--b">
      $49<span class="c-casper">/mo</span>
    </div>
    <button on:click={onUpgradeClick} class="upgrade btn-1 btn--orange btn--l" use:dataPreloader
      >Upgrade to PRO</button
    >
  </div>
</section>

<section class="benefit body-2 row">
  <div class="fluid">
    <h3 class="body-1 txt-m mrg-xl mrg--b">
      Years of market experience, compressed in each report
    </h3>
    <p>
      Since 2017, Santiment has been an industry leader in on-chain data, social intelligence and
      behavior-based analysis of the crypto market.
    </p>
    <p>
      Our tools have a proven track record of timing price tops for cryptocurrencies, helping
      traders find profitable exit points and mitigate HODLing risk.
    </p>

    <h5 class="mrg-s mrg--t mrg--b">Our previous TOP calls:</h5>
    <div class="column body-3">
      <a class="btn" href="/read/waves-crowd-sentiment-pattern-124">WAVES crowd sentiment pattern</a
      >
      <a class="btn" href="/read/matic-charts-a-new-ath%3A-is-the-top-in%3F-2959"
        >MATIC charts a new ATH: is the top in?</a
      >
      <a class="btn" href="/read/icx-insanity.-how-far-could-it-go%3F-5611"
        >ICX insanity. How far could it go?</a
      >
    </div>
  </div>

  <img src="/insight_preview.png" alt="insight card" class="mrg-xxl mrg--l" loading="lazy" />
</section>

<section class="benefit body-2 row">
  <img src="/signal_preview.png" alt="signal form" class="mrg-xxl mrg--r" loading="lazy" />

  <div class="fluid">
    <h3 class="body-1 txt-m mrg-xl mrg--b">What you get with Sanbase Pro:</h3>
    <ul>
      <li>Members-only daily market insights and analysis</li>
      <li>30+ on-chain, social & project indicators for 900 cryptocurrencies</li>
      <li>Custom alerts for the coins' price, on-chain & social trends</li>
      <li>Santiment Spreadsheet plugin with 10+ pre-made market templates</li>
      <li>Personalized asset watchlists and weekly performance reports</li>
    </ul>
  </div>
</section>

<section class="gain body-2 mrg-xl mrg--b">
  <h2 class="h4 txt-m">Gain unfair advantage with Sanbase Pro</h2>
  <p class="cta c-waterloo">
    Subscribe to Sanbase Pro for access to exclusive insights, market-beating metrics, strategies
    and templates!
  </p>

  <button
    on:click={onUpgradeClick}
    class="upgrade btn-1 btn--orange btn--l body-3"
    use:dataPreloader>Subscribe to PRO</button
  >
</section>

<style>
  section {
    text-align: center;
  }

  .top {
    position: relative;
    padding: 95px 0 0;
    background: url('/paywall.svg') no-repeat 50% 0;
  }
  .top::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
    height: 300px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 51.04%,
      #fff 100%
    );
  }

  :global(.night-mode) .top::before {
    background: linear-gradient(
      180deg,
      rgba(24, 27, 43, 0) 0%,
      rgba(24, 27, 43, 0.8) 51.04%,
      #181b2b 100%
    );
  }

  .plan {
    padding: 24px;
    display: inline-block;
  }

  .upgrade {
    width: 220px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .benefit {
    max-width: 620px;
    margin: 64px auto;
    text-align: left;
  }

  p {
    margin: 16px 0;
  }

  .btn {
    --color: var(--green);
    --color-hover: var(--green-hover);
  }

  li {
    margin: 18px 0 0;
    position: relative;
    padding-left: 28px;
  }
  li::before {
    content: url('/success-circle.svg');
    display: block;
    position: absolute;
    top: 5px;
    left: 0;
    opacity: 1;
  }

  .fluid {
    align-self: center;
  }

  img {
    max-width: 310px;
    width: 100%;
  }
  :global(.phone) img,
  :global(.phone-xs) img {
    display: none;
  }

  .cta {
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
  }

  :global(.phone-xs) .cta {
    padding: 0 16px;
  }

  .gain {
    margin: 0 0 64px;
  }
</style>

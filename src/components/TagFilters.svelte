<script>
  import { stores } from '@sapper/app'

  const { page } = stores()
  const TAGS = [
    ['', 'All'],
    ['defi', 'DeFi'],
    ['btc', 'BTC'],
    ['eth,erc-20', 'ETH + ERC-20'],
    ['strategies/alpha', 'Strategies/Alpha'],
    ['metric tutorials', 'Metric Tutorials'],
  ]

  $: ({ tags, onlyPro } = $page.query)
  $: active = onlyPro !== undefined ? 'pro' : (tags || '').toLowerCase()
</script>

<div class="row c-waterloo mrg-xl mrg--t mrg--b">
  {#each TAGS as [link, label]}
    {@const href = link ? `?tags=${link}` : ''}
    <a {href} class="btn-2" class:active={active === link}>{label}</a>
  {/each}

  <a href="?onlyPro" class="pro btn-2 btn-1 btn--orange" class:active={active === 'pro'}
    >Only for PRO</a>
</div>

<style>
  a {
    padding: 6px 16px;
    margin: 8px 15px 0 0;
  }

  .active {
    --bg: var(--green-light-1);
    --color: var(--green);
  }

  .pro.active {
    background: var(--orange-light-1);
    --color: var(--orange);
  }
</style>

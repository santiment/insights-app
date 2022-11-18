<script>
  import { stores } from '@sapper/app'
  import { session } from '@/stores/session'

  export let base = ''

  const { page } = stores()
  const TAGS = [
    ['', 'All'],
    ['defi', 'DeFi'],
    ['btc', 'BTC'],
    ['eth,erc-20', 'ETH + ERC-20'],
    ['strategies/alpha', 'Strategies/Alpha'],
    ['metric tutorials', 'Metric Tutorials'],
  ]

  $: ({ tags, onlyPro, isPulse } = $page.query)
  $: active = setActive(tags, onlyPro, isPulse)
  $: isMobile = $session.isMobile

  function setActive(tags, onlyPro, isPulse) {
    if (onlyPro !== undefined) return 'pro'
    if (isPulse !== undefined) return 'pulse'

    return (tags || '').toLowerCase()
  }
</script>

<div class="row c-waterloo {isMobile ? 'body-2 nowrap no-scrollbar' : 'mrg-xl'} mrg--t mrg--b">
  {#if isMobile}
    <a href="/" class="btn-2" class:active={active === ''}>All</a>
    <a href="?isPulse" class="btn-2" class:active={active === 'pulse'}>Pulse</a>
    <a href="?onlyPro" class="pro btn-2 btn-1 btn--orange" class:active={active === 'pro'}>
      Only for PRO
    </a>
    {#each TAGS.slice(1) as [link, label], idx}
      {@const href = link ? `${base}?tags=${link}` : base}
      <a {href} class="btn-2" class:active={active === link}>{label}</a>
    {/each}
  {:else}
    {#each TAGS as [link, label], idx}
      {@const href = link ? `${base}?tags=${link}` : base}
      <a {href} class="btn-2" class:active={active === link}>{label}</a>
    {/each}

    {#if !base}
      <a href="?onlyPro" class="pro btn-2 btn-1 btn--orange" class:active={active === 'pro'}>
        Only for PRO
      </a>
    {/if}
  {/if}
</div>

<style lang="scss">
  div {
    flex-wrap: wrap;
  }

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

  :global(body:not(.desktop)) {
    div {
      width: 100%;
      background: var(--white);
      gap: 12px;
      flex-wrap: nowrap;
      z-index: 98;
      position: sticky;
      top: 0;
      left: 0;
      padding: 24px 20px 16px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: -ms-autohiding-scrollbar;
    }

    a {
      --bg: var(--athens);

      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      height: 32px;
      margin: 0;
      padding: 4px 12px;
      border-radius: 16px;

      &:focus,
      &:visited,
      &:active {
        outline: none;
      }

      &:not(.pro) {
        border: none;
      }
    }

    .active {
      --bg: var(--green-light-1);
    }

    .pro {
      padding: 3px 11px;
    }

    .pro.active {
      border-color: var(--orange-light-1);
    }
  }
</style>

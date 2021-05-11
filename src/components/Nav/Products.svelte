<script >
  import Icon from '@/ui/Icon.svelte'
  import Tooltip from '@/components/Tooltip.svelte'

  const business = [
    {
      title: 'Sanbase',
      desc: 'Behavior analysis & monitoring platform for 1000+ crypto assets',
      href: 'https://app.santiment.net',
      logo: 'sanbase',
    },
    {
      title: 'Sansheets',
      desc: 'Google Spreadsheets plugin for importing Santiment data',
      href: 'https://sheets.santiment.net',
      logo: 'sansheets',
    },
    {
      title: 'SanAPI',
      desc: 'The most comprehensive crypto API on the market',
      href: 'https://neuro.santiment.net',
      logo: 'sanapi',
    },
    {
      title: 'Data Science as a Service',
      desc: 'Bespoke market intelligence for digital assets',
      href: '/',
      logo: 'sandata',
        onClick: () => window.Intercom && window.Intercom('showNewMessage', 'Talk with expert about Data Science as a Service.')
    },
  ]

  const chain = [
    {
      title: 'SanR',
      desc: 'Decentralized marketplace for crypto price signals',
      href: 'https://sanr.santiment.net',
      logo: 'sanr',
    },
    {
        title: 'Sanhunters',
        desc: 'Get rewarded for market research and your crypto know-how',
        href: '/',
        logo: 'sanhunters',
    },
    {
      title: 'Insights',
      desc: 'Market analysis from the San team and community members',
      href: '/',
      logo: 'insights',
        active: true,
        note: 'SAN chain support soon'
    },
  ]
</script>

<a href="/" class="san">
  <img  alt="Santiment" src="/san-logo.svg" />
  Insights
</a>

<Tooltip activeClass="Trigger-products-active" position="bottom" align="start" class="Products-tooltip">
  <div slot="trigger" class="toggle" />

  <div slot="content" class="dropdown row">
    <div class="column mrg-xl mrg--r">
      <h3>SAN Business</h3>
      {#each business as { title, href, desc, logo, onClick }}
          <a {href} class="product" on:click="{onClick }">
          <div class="icon" style="--logo: url(/products/{logo}.svg)" />
          <h2 class="body-2 txt-m">{title}</h2>
          <p>{desc}</p>
        </a>
      {/each}
    </div>

    <div class="column chain">
      <h3>SAN Chain</h3>
      {#each chain as { title, href, desc, logo, active , note}}
        <a {href} class="product">
          <div
            class="icon"
            class:active
            style="--logo: url(/products/{logo}.svg)" />
          <h2 class="body-2 txt-m">{title}</h2>
          <p>{desc}</p>
          {#if note}
              <span class="note">{note}</span>
              {/if}
        </a>
      {/each}
    </div>

    <a class="santiment" href="https://santiment.net/">
      <Icon id="santiment" w="104" h="20" />
    </a>
  </div>
</Tooltip>

<style lang="scss">

 .san {
     display: flex;
     align-items: center;
     font-size: 16px;
     line-height: 24px;
     font-weight: 500;
     color: var(--black);
     margin-right: 8px;
 }

 .column, .row {
     display: flex;
 }
 .column{
     flex-direction: column;
 }


 img {
     margin-right: 8px;
     vertical-align: middle;
     width: 32px;
     height: 32px;
 }

  .toggle {
    width: 32px;
    height: 32px;
    background: url(/products/toggle.svg) no-repeat 50%;
    cursor: pointer;
    border-radius: 4px;
    transition: transform 0.2s ease-in-out;
  }
 :global(.Trigger-products-active) {
    background-color: var(--athens) !important;
    transform: rotate(90deg);
  }

 :global(.Products-tooltip) {
     max-height: initial !important;
     max-width: initial !important;
     z-index: 10;
 }

  .dropdown {
    padding: 32px 32px 24px;
    background: url(/products/wave.svg) no-repeat 100% 100%;

    :global(.night-mode) & {
      background-image: url(/products/wave-dark.svg);
    }
  }

  h3 {
    margin: 0 0 20px;
  }
  h2 {
    color: var(--black);
  }

  h3,
  p {
    color: var(--waterloo);
  }

  .icon {
    width: 40px;
    height: 40px;
    background: var(--logo) no-repeat 50%, var(--athens);
    position: absolute;
    left: 16px;
    top: 12px;
    border-radius: 4px;
  }

  .product {
    width: 292px;
    padding: 12px 16px 12px 68px;
    position: relative;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background: var(--athens);

      .icon {
        background-color: var(--white);
      }
    }
  }

  .active {
    background-color: var(--jungle-green-light) !important;
  }

  .santiment {
    position: absolute;
    bottom: 43px;
    right: 72px;

    &:hover {
      fill: var(--waterloo);
    }
  }

 .note {
     color: var(--texas-rose);
     margin-top: 4px;
     padding: 1px 8px;
     font-weight: 400;
     background-color: var(--texas-rose-light);
     border-radius: 4px;
     display: inline-block;
 }
</style>

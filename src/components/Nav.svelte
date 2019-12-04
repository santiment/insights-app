<script>
  import SmoothDropdown from '@/components/SmoothDropdown'
  import NavAssetsDropdown from '@/components/Nav/AssetsDropdown'
  import NavHelpDropdown from '@/components/Nav/HelpDropdown'
  import NavAccountDropdown from '@/components/Nav/AccountDropdown'
  import NavProductsDropdown from '@/components/Nav/ProductsDropdown'
  import NavLabsDropdown from '@/components/Nav/LabsDropdown'
  import ProjectsSearch from '@/components/Nav/Search'

  export let segment

  let activeTrigger
  const dropdownItems = [
    {
      id: 'products-trigger',
      component: NavProductsDropdown,
      class: 'Nav__dd-products',
    },
    { id: 'assets-trigger', component: NavAssetsDropdown },
    {
      id: 'labs-trigger',
      component: NavLabsDropdown,
      class: 'Nav__dd-labs',
    },
    { id: 'help-trigger', component: NavHelpDropdown },
    { id: 'account-trigger', component: NavAccountDropdown },
  ]

  function onTriggerEnter({ currentTarget }) {
    activeTrigger = currentTarget
  }
</script>

<template lang="pug">
include /ui/mixins
- var appPath = 'https://app.santiment.net'

header
  .container
    nav.nav
      .product(on:mouseenter="{onTriggerEnter}", id="products-trigger", data-offset-y='-3', data-centered='', data-active-class='active')
        a(href='/')
          img(src='/san-logo.svg', alt='Santiment logo')
        +button.product__arrow(variant="flat",  aria-label='Products dropdown')
          +icon('arrow-down').icon-arrow-down
      +button.link(href=appPath+'/sonar', variant="flat") Sonar
      +button.link(href=appPath+'/assets', variant="flat", on:mouseenter="{onTriggerEnter}", id="assets-trigger") Assets
      +button.link.active(href="/", variant="flat", prefetch) Insights
      +button.link(href=appPath+'/labs', variant="flat", on:mouseenter="{onTriggerEnter}", id="labs-trigger", data-offset-x='-72', data-centered='') Labs
      +button.link(href='https://graphs.santiment.net/', variant="flat") Graphs
        +icon('external-link').icon-external-link
    .right
      ProjectsSearch
      +button(href=appPath+'/help', variant="flat",
      on:mouseenter="{onTriggerEnter}", id="help-trigger",
      aria-label="Help menu").right__btn
        +icon('question-round').icon-question
      +button(href=appPath+'/account', class:active="{segment === 'account'}", variant="flat", on:mouseenter="{onTriggerEnter}",
      id="account-trigger", aria-label="Profile menu", data-active-class='account_opened', data-offset-y='-4',).right__btn.account
        +icon('user').icon-user

    SmoothDropdown(trigger="{activeTrigger}", items="{dropdownItems}")
</template>

<style lang="scss">
  @import '@/variables';
  @import '@/mixins';

  .icon- {
    &question {
      @include size(16px);
    }
    &user {
      @include size(15px, 17px);
    }
    &arrow-down {
      @include size(8px, 5px);
    }

    &external-link {
      @include size(12px);
      margin-left: 6px;
    }
  }

  .product {
    display: flex;
    align-items: center;
    margin-right: 32px;

    &__arrow {
      @include size(16px);
      margin-left: 4px;
      padding: 5.5px 4px;
      fill: var(--waterloo);
    }
  }

  :global(.product.active .product__arrow) {
    background: var(--jungle-green-light);
    fill: var(--jungle-green);
    transform: rotate(180deg);
  }

  header {
    border-bottom: 1px solid var(--porcelain);
    background: var(--white);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 13px 15px;

    @include responsive('desktop') {
      padding: 15px 0 14px;
    }
  }

  .container {
    max-width: $desktop-container-width;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  img {
    vertical-align: middle;
  }

  .nav {
    display: flex;
    align-items: center;
  }

  .link {
    color: var(--waterloo);
    fill: var(--waterloo);
    margin-right: 8px;

    &:hover {
      color: var(--jungle-green);
      fill: var(--jungle-green);
    }
  }

  .right {
    display: flex;
    align-items: center;

    &__btn {
      fill: var(--waterloo);
      padding: 8px;

      &:hover {
        fill: var(--jungle-green);
      }
    }
  }

  :global(.Nav__dd-products) {
    padding: 24px 16px 16px;
    width: 1140px;
  }

  :global(.Nav__dd-labs) {
    padding: 24px;
    width: 1140px;
  }

  .account {
    @include size(39px);
    background: #edf8f5;
    border-radius: 50%;
    border: 1px solid #edf8f5;
    fill: var(--jungle-green);
    justify-content: center;
    margin-left: 16px;

    :global(&.account_opened),
    &:hover {
      border-color: var(--jungle-green);
    }
  }
</style>

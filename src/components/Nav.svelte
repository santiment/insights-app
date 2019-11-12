<script>
  import SmoothDropdown from '@/components/SmoothDropdown'
  import NavLabsDropdown from '@/components/Nav/LabsDropdown'
  import NavAssetsDropdown from '@/components/Nav/AssetsDropdown'
  import NavHelpDropdown from '@/components/Nav/HelpDropdown'
  import NavAccountDropdown from '@/components/Nav/AccountDropdown'
  import Products from '@/components/Nav/Products'
  import ProjectsSearch from '@/components/ProjectsSearch'
  import UpgradeBtn from '@/components/UpgradeBtn'

  export let segment

  let activeTrigger
  const dropdownItems = [
    {
      id: 'products-trigger',
      component: Products,
      class: 'Nav__dd-products',
    },
    { id: 'assets-trigger', component: NavAssetsDropdown },
    { id: 'labs-trigger', component: NavLabsDropdown },
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
      a(href='/')
        img(src='/san-logo.svg', alt='Santiment logo')
      +button.products(variant="flat", on:mouseenter="{onTriggerEnter}",
      id="products-trigger", aria-label='Products dropdown',
      data-offset-y='8', data-offset-x='-42', data-centered='')
        +icon('arrow-down').icon-arrow-down
      +button.link(href=appPath+'/sonar', variant="flat") Sonar
      +button.link(href=appPath+'/assets', variant="flat", on:mouseenter="{onTriggerEnter}", id="assets-trigger") Assets
      +button.link.active(href="/", variant="flat", prefetch) Insights
      +button.link(href=appPath+'/labs', variant="flat", on:mouseenter="{onTriggerEnter}", id="labs-trigger") Labs
      +button.link(href='https://graphs.santiment.net/', variant="flat") Graphs
      //UpgradeBtn

    .right
      ProjectsSearch.Nav__search
      +button(href=appPath+'/help', variant="flat",
      on:mouseenter="{onTriggerEnter}", id="help-trigger",
      aria-label="Help menu").btn-icon
        +icon('question-round').icon-question
      +button(href=appPath+'/account', class:active="{segment === 'account'}", variant="flat", on:mouseenter="{onTriggerEnter}",
      id="account-trigger", aria-label="Profile menu").btn-icon
        +icon('user').icon-user

    SmoothDropdown(trigger="{activeTrigger}", items="{dropdownItems}")
</template>

<style lang="scss">
  @import '@/variables';
  @import '@/mixins';

  .btn-icon {
    fill: var(--waterloo);

    &:hover {
      fill: var(--jungle-green);
    }
  }

  .products {
    @include size(16px);
    margin: 0 32px 0 4px;
    padding: 5.5px 4px;
    fill: var(--waterloo);
  }

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
      padding: 14px 0;
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
    margin-right: 4px;

    &:hover {
      color: var(--jungle-green);
    }
  }

  .right {
    display: flex;
    align-items: center;
  }

  :global(.Nav__search) {
    margin-right: 37px;

    &::after {
      content: '';
      position: absolute;
      right: -25px;
      top: 4px;
      height: 32px;
      width: 1px;
      background: var(--porcelain);
    }
  }

  :global(.Nav__dd-products) {
    padding: 24px 16px 16px;
    width: 1140px;
  }
</style>

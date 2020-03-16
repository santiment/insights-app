<script>
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import SmoothDropdown from '@/components/SmoothDropdown'
  import NavAccountDropdown from '@/components/Nav/AccountDropdown'
  import NavProductsDropdown from '@/components/Nav/ProductsDropdown'
  import PlanInfo from '@/components/Nav/PlanInfo'
  import { EMPTY_USER_INSIGHTS } from '@/gql/insights'

  const { session } = stores()

  const dropdownItems = [
    {
      id: 'products-trigger',
      component: NavProductsDropdown,
      class: 'Nav__dd-products',
    },
    { id: 'account-trigger', component: NavAccountDropdown },
  ]

  let hasNoInsights = false
  $: avatar = $session.currentUser ? $session.currentUser.avatarUrl || '' : ''

  $: if (process.browser && !hasNoInsights && $session.currentUser) {
    client
      .query({
        query: EMPTY_USER_INSIGHTS,
      })
      .then(
        ({
          data: {
            currentUser: { insights },
          },
        }) => {
          hasNoInsights = insights.length === 0
        },
      )
  }

  let activeTrigger
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
      .product(on:mouseenter="{onTriggerEnter}", id="products-trigger", data-centered='window', data-active-class='active')
        a(href='/')
          img(src='/san-logo.svg', alt='Santiment logo')
        +button.product__arrow(variant="flat",  aria-label='Products dropdown')
          +icon('arrow-down').icon-arrow-down
      .divider
      +button(href=appPath, border)
        +icon('arrow-down').icon-arrow-left
        |Back to Sanbase
    .right
      +if('$session.currentUser && hasNoInsights')
        +button(href='/login', border, accent='jungle-green') Be an Author
        .divider
      PlanInfo
      +button(href=appPath+'/account', variant="flat", on:mouseenter="{onTriggerEnter}",
      id="account-trigger", aria-label="Profile menu", data-active-class='account_opened', style!='background-image: url({avatar})').right__btn.account
        +if('!avatar')
          +icon('user').icon-user

    SmoothDropdown(trigger="{activeTrigger}", items="{dropdownItems}")
</template>

<style lang="scss">
  @import '@/variables';
  @import '@/mixins';

  .icon- {
    &user {
      @include size(16px);
    }
    &arrow-down,
    &arrow-left {
      @include size(8px, 5px);
    }
    &arrow-left {
      transform: rotate(90deg);
      fill: var(--casper);
      margin-right: 13px;
    }
  }

  .product {
    display: flex;
    align-items: center;

    &__arrow {
      @include size(16px);
      margin-left: 7px;
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
      padding: 19px 0 18px;
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
    @include size(32px);
  }

  .nav {
    display: flex;
    align-items: center;
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

  .account {
    @include size(32px);
    background: #edf8f5;
    border-radius: 50%;
    fill: var(--jungle-green);
    justify-content: center;
    background-size: cover;

    :global(&.account_opened),
    &:hover {
      box-shadow: inset 0px 0px 0px 1px var(--jungle-green);
    }
  }

  .divider {
    margin: 0 24px;
    width: 1px;
    height: 32px;
    background: var(--porcelain);
  }
</style>

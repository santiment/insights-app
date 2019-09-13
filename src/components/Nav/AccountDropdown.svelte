<script>
  import { stores } from '@sapper/app'
  import Toggle from '@/components/Toggle'
  import ProfileInfo from '@/components/ProfileInfo'
  import { ui } from '@/stores/ui'
  import { getCurrentSanbaseSubscription } from '@/utils/plans'

  const { session } = stores()

  let username, id, plan

  let currentUser
  $: currentUser = $session.currentUser

  $: if (currentUser) {
    username = currentUser.username || currentUser.email
    id = currentUser.id
    const sub = getCurrentSanbaseSubscription(currentUser)
    plan = sub ? sub.plan.name : 'Free'
  }
</script>

<template lang="pug">
include /ui/mixins
- var appPath = 'https://app.santiment.net'

.wrapper
  +if('currentUser')
    ProfileInfo(name="{username}", id="{id}" status="{plan} plan", classes="{{wrapper: 'account-dd__profile'}}")
    hr.divider
  .category.category_toggles
    +button.item.item_toggle(variant='ghost', on:click="{ui.toggleDarkMode}", fluid) Night mode
      Toggle(active="{$ui.darkMode}")
  hr.divider
  .category.category_links
    +button.item(href=appPath+'/sonar/my-signals', variant='ghost', fluid) My signals
    +button.item(href=appPath+'/assets', variant='ghost', fluid) My watchlists
    +button.item(href='/my', variant='ghost', fluid) My insights
  hr.divider
  .category.category_links
    +if('currentUser')
      +button.item(href=appPath+"/account", variant='ghost', fluid) Account Settings
      +button.item.item_logout(href="/logout", variant='ghost', fluid)
        +icon('logout').logout
        |Logout
      +else()
        +button.item(href="/login", variant='ghost', fluid) Login

</template>

<style lang="scss">
  @import '@/mixins';

  .wrapper {
    width: 260px;
  }

  :global(.account-dd__profile) {
    padding: 15px 20px 12px 16px;
    .status {
      text-transform: lowercase;

      &:first-letter {
        text-transform: uppercase;
      }
    }
  }

  .category {
    padding: 8px;
  }

  .divider {
    background: var(--porcelain);
    height: 1px;
    border: none;
  }

  .item {
    white-space: nowrap;
    width: 100%;

    &_toggle {
      justify-content: space-between;
    }

    &_logout {
      color: var(--persimmon);
      fill: var(--persimmon);

      &:hover {
        color: var(--persimmon-hover);
        fill: var(--persimmon-hover);
      }
    }
  }

  .logout {
    @include size(16px);
    margin: 0 8px 0 -1px;
  }
</style>

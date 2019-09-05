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
    +button.item.item_toggle(variant='ghost', on:click="{ui.toggleDarkMode}", fluid) Dark Mode
      Toggle(active="{$ui.darkMode}")
    +button.item.item_toggle(variant='ghost', on:click='{ui.toggleBetaMode}', fluid) Beta Mode
      Toggle(active="{$ui.betaMode}")
  hr.divider
  .category.category_links
    +if('currentUser')
      +button.item(href=appPath+"/account", variant='ghost', fluid) Account Settings
      +button.item(href="/logout", variant='ghost', fluid) Logout
      +else()
        +button.item(href="/login", variant='ghost', fluid) Login
</template>

<style lang="scss">
  .wrapper {
    width: 260px;
  }

  :global(.account-dd__profile) {
    padding: 15px 20px 12px 16px;
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
  }
</style>

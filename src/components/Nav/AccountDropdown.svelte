<script>
  import { stores } from '@sapper/app'
  import Toggle from '@/components/Toggle'
  import ProfileInfo from '@/components/ProfileInfo'
  import UpgradeBtn from '@/components/UpgradeBtn'
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
    .user
      ProfileInfo(name="{username}", id="{id}" status="Sanbase: {plan} plan", classes="{{wrapper: 'account-dd__profile'}}")
      UpgradeBtn.AccountDropdown__upgrade
  +if('currentUser')
    hr.divider
    .category.category_links
      +button.item(href=appPath+'/sonar/my-signals', variant='ghost', fluid) My signals
      +button.item(href=appPath+'/assets', variant='ghost', fluid) My watchlists
      +button.item(href='/my', variant='ghost', fluid) My insights
      +button.new(href='/new', variant='fill', accent='jungle-green', rel='prefetch') Write insight
  hr.divider
  .category.category_links
    +button.item.item_toggle(variant='ghost', on:click="{ui.toggleDarkMode}", fluid) Night mode
      Toggle(active="{$ui.darkMode}")
    +if('currentUser')
      +button.item(href=appPath+"/labs", variant='ghost', fluid) Labs
      +button.item(href=appPath+"/account", variant='ghost', fluid) Account Settings
      +button.item(href="mailto:support@santiment.net", variant='ghost', fluid) Contact us
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

  .user {
    padding: 13px 20px 16px 16px;
  }

  :global(.account-dd__profile) {
    .status {
      text-transform: lowercase;

      &:first-letter {
        text-transform: uppercase;
      }
    }
  }

  :global(.AccountDropdown__upgrade) {
    margin-top: 9px;
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
      color: var(--red);
      fill: var(--red);

      &:hover {
        color: var(--red-hover);
        fill: var(--red-hover);
      }
    }
  }

  .logout {
    @include size(16px);
    margin: 0 8px 0 -1px;
  }

  .new {
    margin: 6px 0 8px 8px;
  }
</style>

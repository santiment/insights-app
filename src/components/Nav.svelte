<script>
  import SmoothDropdown from '@/components/SmoothDropdown'
  import NavLabsDropdown from '@/components/Nav/LabsDropdown'
  import NavAssetsDropdown from '@/components/Nav/AssetsDropdown'
  import NavHelpDropdown from '@/components/Nav/HelpDropdown'
  import NavAccountDropdown from '@/components/Nav/AccountDropdown'
  import ProjectsSearch from '@/components/ProjectsSearch'
  import UpgradeBtn from '@/components/UpgradeBtn'

  export let segment

  let activeTrigger
  const dropdownItems = [
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
      a.logo(href='/') Santiment
      +button.link(href=appPath+'/assets', variant="flat", on:mouseenter="{onTriggerEnter}", id="assets-trigger") Assets
      +button.link(href=appPath+'/sonar', variant="flat") Sonar
      +button.link.active(href="/", variant="flat", prefetch) Insights
      +button.link(href=appPath+'/labs', variant="flat", on:mouseenter="{onTriggerEnter}", id="labs-trigger") Labs
      UpgradeBtn

    .right
      ProjectsSearch.search
      +button(href=appPath+'/help', variant="flat", on:mouseenter="{onTriggerEnter}", id="help-trigger", aria-label="Help menu")
        +icon('question-round').icon-question
      +button(href=appPath+'/account', class:active="{segment === 'account'}", variant="flat", on:mouseenter="{onTriggerEnter}", id="account-trigger", aria-label="Profile menu")
        +icon('user').icon-user

  SmoothDropdown(trigger="{activeTrigger}", items="{dropdownItems}")
</template>

<style lang="scss">
  @import '@/variables';
  @import '@/mixins';

  .icon- {
    &question {
      @include size(15px);
      margin-left: 12px;
    }
    &user {
      @include size(14px, 16px);
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
      padding: 13px 0;
    }
  }

  .container {
    max-width: $desktop-container-width;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .logo {
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;
    color: var(--mirage) !important;
    margin-right: 46px;
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

  .search {
    margin-right: 16px;
  }
</style>

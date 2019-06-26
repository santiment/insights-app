<script>
  import SmoothDropdown from '@/components/SmoothDropdown'
  import NavLabsDropdown from '@/components/Nav/LabsDropdown'
  import NavAssetsDropdown from '@/components/Nav/AssetsDropdown'
  import NavHelpDropdown from '@/components/Nav/HelpDropdown'
  import NavAccountDropdown from '@/components/Nav/AccountDropdown'
  import ProjectsSearch from '@/components/ProjectsSearch'
  import { notifications } from '@/stores/notifications'

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

button(on:click!="{() => notifications.add({title: 'test'})}") notific

header
  .container
    nav.nav
      a.logo(href="/") Santiment
      +button.link(href="/", variant="flat", class:active="{segment === undefined}") Dashboard
      +button.link(href="/assets", variant="flat", class:active="{segment === 'assets'}", on:mouseenter="{onTriggerEnter}", id="assets-trigger") Assets
      +button.link(href="/insights", variant="flat", class:active="{segment === 'insights'}", prefetch) Insights
      +button.link(href="/labs", variant="flat", class:active="{segment === 'labs'}", on:mouseenter="{onTriggerEnter}", id="labs-trigger") Labs

    .right
      ProjectsSearch.search
      +button(href="/help", variant="flat", on:mouseenter="{onTriggerEnter}", id="help-trigger", aria-label="Help menu")
        +icon('question-round').icon-question
      +button(href="/account", class:active="{segment === 'account'}", variant="flat", on:mouseenter="{onTriggerEnter}", id="account-trigger", aria-label="Profile menu")
        +icon('user').icon-user

  SmoothDropdown(trigger="{activeTrigger}", items="{dropdownItems}")
</template>

<style lang="scss">
  @import '@/variables.scss';
  @import '@/mixins.scss';

  .icon- {
    &question {
      @include size(15px);
    }
    &user {
      @include size(14px, 16px);
    }
  }

  header {
    border-bottom: 1px solid var(--porcelain);
    background: var(--white);
    padding: 18px 0;
  }

  .container {
    max-width: 1045px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .logo {
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;
    margin-right: 72px;
    color: var(--mirage) !important;
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

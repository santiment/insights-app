<script>
  import Toggle from "@/components/Toggle";
  import ProfileInfo from "@/components/ProfileInfo";
  import { darkMode } from "@/stores/ui";
  import { user } from "@/stores/user";

  let username, sanBalance, id;

  if ($user) {
    username = $user.username || $user.email;
    sanBalance = $user.sanBalance.toFixed(2);
    id = $user.id;
  }
</script>

<template lang="pug">
include /ui/mixins

.wrapper
  +if('$user')
    ProfileInfo(name="{username}", id="{id}" status="{sanBalance} tokens available", classes="{{wrapper: 'account-dd__profile'}}")
    hr.divider
  .category.category_toggles
    +button.item.item_dark(variant='ghost', on:click="{darkMode.toggle}", fluid) Dark Mode
      Toggle(active="{$darkMode}")
    +button.item(variant='ghost', fluid) Beta Mode
  hr.divider
  .category.category_links
    +if('$user')
      +button.item(href="/account", variant='ghost', fluid) Account Settings
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

    &_dark {
      justify-content: space-between;
    }
  }
</style>

<script></script>

<template lang="pug">
include /ui/mixins

+setting(title='API Keys', id='api-keys')
  +settingRow()
    div
      h3 API Keys
      h4
        |The api key will give you access to the data that requires SAN token staking.
        br
        |Can only be used to fetch data and not to execute graphql mutations.

    +button(variant='fill', accent='jungle-green') Generate
</template>

<style>
  h4 {
    color: var(--waterloo);
    margin-top: 6px;
  }
</style>

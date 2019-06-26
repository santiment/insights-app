<script>
  export let segment
</script>

<template lang="pug">
nav
  a(href='/assets') Assets
  a(href='/insights') Insights
  a(href='/menu') Menu
</template>

<style>
  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 1000;
    background: var(--white);
    border-top: 1px solid var(--porcelain);
  }
</style>

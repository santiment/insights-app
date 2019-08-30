<script>
  export let segment
</script>

<template lang="pug">
mixin icon(name)
  svg&attributes(attributes)
    use(href!=`mobile-nav.svg#${name}`)

nav
  a(href='https://app.santiment.net/assets')
    +icon('assets')
    |Assets
    
  a(href='https://app.santiment.net/sonar')
    +icon('sonar')
    |Sonar

  a.active(href='/')
    +icon('insights')
    |Insights

  a(href='/menu')
    +icon('menu')
    |Menu

</template>

<style lang="scss">
  @import '@/mixins';

  nav {
    --icon-primary: var(--mirage);
    --icon-secondary: var(--porcelain);

    z-index: 5;
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;
    padding: 9px 0px 4px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: var(--white);
    border-top: 1px solid var(--porcelain);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  a {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .active {
    color: var(--jungle-green);
    --icon-primary: var(--jungle-green);
    --icon-secondary: var(--jungle-green-light-2);
  }

  svg {
    @include size(18px);
  }
</style>

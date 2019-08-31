<script>
  export let segment
  export let isLoggedIn = false

  let menuOpened = false

  let loginHref
  let loginLabel
  $: {
    loginHref = isLoggedIn ? '/logout' : '/login'
    loginLabel = isLoggedIn ? 'Logout' : 'Login'
  }

  function hideMenu() {
    menuOpened = false
  }

  function toggleMenu() {
    menuOpened = !menuOpened
  }
</script>

<template lang="pug">
include /ui/mixins

- var appPath = 'https://app.santiment.net/'

mixin icon(name)
  svg&attributes(attributes)
    use(href!=`mobile-nav.svg#${name}`)

nav
  a.btn(href='https://app.santiment.net/assets')
    +icon('assets')
    |Assets
    
  a.btn(href='https://app.santiment.net/sonar')
    +icon('sonar')
    |Sonar

  a.btn(href='/', class:active='{!menuOpened}', on:click='{hideMenu}')
    +icon('insights')
    |Insights

  button.btn(on:click='{toggleMenu}', class:active='{menuOpened}')
    +icon('menu')
    |Menu

+if('menuOpened')
  .menu
    img(src='santiment.svg', alt='Santiment Logo')
    .menu__links
      a.menu__link(href=appPath+'account') Account settings
      a.menu__link(href=appPath+'support') Support
    +button.login(variant='fill', accent='jungle-green', href='{loginHref}', fluid, on:click='{hideMenu}') {loginLabel}

</template>

<style lang="scss">
  @import '@/mixins';

  button {
    outline: none;
    border: none;
    background: none;
  }

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

  .btn {
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

  .menu {
    z-index: 2;
    background: var(--white);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 35px 16px 95px;

    &__links {
      display: flex;
      flex-direction: column;
      text-align: center;
      @include text('body-1');
    }

    &__link {
      margin-bottom: 30px;

      &:last-child {
        margin: 0;
      }
    }
  }

  .login {
    justify-content: center;
  }
</style>

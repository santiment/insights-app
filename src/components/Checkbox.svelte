<script>
  export let active = false
  let klass = ''
  export { klass as class }

  function onClick() {
    active = !active
  }
</script>

<template lang="pug">
button(class:active, on:click='{onClick}', class='{klass}')
</template>

<style lang="scss">
  button {
    outline: none;
    cursor: pointer;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    border: 1px solid var(--porcelain);
    background: var(--white);

    &:hover {
      border-color: var(--jungle-green);
    }

    &.active {
      border-color: var(--jungle-green);
      background: url('/checkmark.svg') no-repeat 50%;
      background-color: var(--jungle-green);

      &:hover {
        border-color: var(--jungle-green-hover);
        background-color: var(--jungle-green-hover);
      }
    }
  }
</style>

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
      border-color: var(--green);
    }

    &.active {
      border-color: var(--green);
      background: url('/checkmark.svg') no-repeat 50%;
      background-color: var(--green);

      &:hover {
        border-color: var(--green-hover);
        background-color: var(--green-hover);
      }
    }
  }
</style>

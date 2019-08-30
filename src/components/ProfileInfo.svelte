<script>
  export let name,
    id,
    status,
    classes = {},
    withPic = false
</script>

<template lang="pug">
.wrapper(class="{classes.wrapper || ''}")
  +if('withPic')
    .icon
      img(src="profile-fallback.svg", alt="Profile picture")

  .info(class="{classes.info || ''}")
    a.name(href="/user/{id}") {name}
    +if('status')
      .status {status}

</template>

<style lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    background: var(--porcelain);
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: var(--white);

    :global(.night-mode) & {
      fill: var(--casper);
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    flex: 1;
  }

  .name {
    line-height: 15px;
    height: 15px;
    min-width: 180px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }

  .status {
    margin-top: 4px;
    line-height: 1;
    font-size: 12px;
    color: var(--waterloo);
  }
</style>

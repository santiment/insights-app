<script>
  export let name,
    id,
    status = '',
    classes = {},
    avatarUrl = '',
    withPic = false
</script>

<template lang="pug">
.wrapper(class="{classes.wrapper || ''}")
  +if('withPic')
    .icon(class="{classes.icon || ''}")
      img(src="{avatarUrl || 'profile-fallback.svg'}", alt="Profile picture")

  .info(class="{classes.info || ''}")
    a.name(class="{classes.name || ''}", href="https://app.santiment.net/profile/{id}") {name}
    +if('status')
      .status(class="{classes.status || ''}") {status}

</template>

<style lang="scss">
  @import '@/mixins';

  .wrapper {
    display: flex;
    align-items: center;
    width: calc(100% - 124px);
  }

  .icon {
    @include size(32px);
    min-width: 32px;
    border-radius: 50%;
    background: var(--porcelain);
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: var(--white);
    overflow: hidden;

    :global(.night-mode) & {
      fill: var(--casper);
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 44px);
  }

  .name {
    line-height: 15px;
    height: 15px;
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
    white-space: nowrap;
  }
</style>

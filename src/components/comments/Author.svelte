<script>
  export let avatarUrl, username
</script>

<template lang="pug">
include /ui/mixins

.profile
  .pic
    img(src!='{avatarUrl || "profile-fallback.svg"}', alt="Profile pic")
  h4 {username}

</template>

<style lang="scss">
  @import '@/mixins';

  .profile {
    display: flex;
    align-items: center;
    max-width: 71%;
  }

  .pic {
    @include size(40px);
    border-radius: 50%;
    background: var(--porcelain);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    min-width: 22px;
  }

  h4 {
    @include text('body-2');
    margin-left: 12px;
    color: var(--mirage);
    max-width: 100%;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }
</style>

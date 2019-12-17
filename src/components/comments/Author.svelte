<script>
  export let avatarUrl, username, id, insightAuthorId
</script>

<template lang="pug">
include /ui/mixins

.profile
  .pic
    img(src!='{avatarUrl || "profile-fallback.svg"}', alt="Profile pic")
  .right
    h4 {username}
    +if('id === insightAuthorId')
      h5 Author

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
    min-width: 40px;
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
  }

  .right {
    margin-left: 12px;
    line-height: 0;
  }

  h4 {
    @include text('body-2');
    color: var(--mirage);
    max-width: 100%;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }

  h5 {
    display: inline-block;
    font-size: 10px;
    line-height: 12px;
    color: var(--texas-rose);
    padding: 3px 4px;
    border-radius: 4px;
    background: var(--texas-rose-light);
  }
</style>

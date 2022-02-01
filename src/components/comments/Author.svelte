<script>
  export let avatarUrl, username, id, insightAuthorId
</script>

<template lang="pug">
include /ui/mixins

a.profile(href='https://app.santiment.net/profile/{id}')
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
    color: var(--mirage);

    &:hover {
      color: var(--green);
    }
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
    max-width: 86%;
  }

  h4 {
    @include text('body-2');
    max-width: 100%;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }

  h5 {
    display: inline-block;
    font-size: 10px;
    line-height: 12px;
    color: var(--orange);
    padding: 3px 4px;
    border-radius: 4px;
    background: var(--orange-light-1);
  }
</style>

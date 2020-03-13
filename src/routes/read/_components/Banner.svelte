<script>
  import { stores } from '@sapper/app'
  import Loadable from '@/components/Loadable'
  const loadAnonBanner = () => import('@/components/Banner/BannerInsight')
  const loadFollowBanner = () => import('@/components/Banner/FollowBanner')
  const { session } = stores()

  export let isAuthor, user

  $: currentUser = $session.currentUser

  $: isNotFollowed =
    currentUser &&
    currentUser.following.users.every(following => following.id !== user.id)
</script>

<template lang="pug">
+if('currentUser')
  +if('isNotFollowed && !isAuthor')
    Loadable.Banner__follow(load="{loadFollowBanner}", targetId='{user.id}', author='{user.username}')
  +else()
    Loadable(load="{loadAnonBanner}")
</template>

<style>
  :global(.Banner__follow) {
    margin: 40px auto 0 !important;
  }
</style>

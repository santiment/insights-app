<script>
  import ProfileInfo from '@/components/ProfileInfo'
  import Loadable from '@/components/Loadable'
  import { getDateFormats } from '@/utils/dates'
  const loadFollowBtn = () => import('@/components/FollowBtn')
  const classes = {
    wrapper: 'insight__profile',
  }

  export let user, isAuthor, publishedAt

  $: insightDate = formatInsightDate(publishedAt)

  function formatInsightDate(date) {
    const { MMM, D, YYYY } = getDateFormats(new Date(date))
    return `${MMM} ${D}, ${YYYY}`
  }
</script>

<template lang="pug">

.wrapper
  ProfileInfo(withPic, {classes}, name="{user.username}", id="{user.id}", avatarUrl="{user.avatarUrl}", status="{insightDate}", user='{user}')

  +if('!isAuthor')
    Loadable.Author__follow(load="{loadFollowBtn}", targetId='{user.id}')

</template>

<style>
  .wrapper {
    display: flex;
    align-items: center;
  }

  :global(.Author__follow) {
    margin-left: auto;
  }
</style>

<script context="module">
  import { client } from '@/apollo'

  export async function preload(_, session, { apollo = client }) {
    if (typeof session.currentUser !== 'object') {
      await session.loadingUser
    }
    const { currentUser } = session

    if (!currentUser) {
      return this.redirect(302, '')
    }
  }
</script>

<script>
  import Editor from '@/components/insights/Editor'
</script>

<template lang="pug">
Editor
</template>

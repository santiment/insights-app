<script>
  import { onMount, onDestroy } from 'svelte'
  import { goto } from '@sapper/app'
  import { user } from '@/stores/user'
  import { logout } from '@/utils/login'

  let timer
  onMount(() => {
    user.set(null)
    logout()
    timer = setTimeout(() => goto('/'), 2000)
  })

  onDestroy(() => {
    clearTimeout(timer)
  })
</script>

<template lang="pug">
| Goodbye!
</template>

<script>
  import { onMount, onDestroy } from 'svelte'
  import { goto } from '@sapper/app'
  import { logout } from '@/utils/login'

  let timer
  onMount(() => {
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

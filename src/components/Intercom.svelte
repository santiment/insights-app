<script>
  import { onMount } from 'svelte'
  import { stores } from '@sapper/app'
  import { user$ } from '@/stores/user'

  const { page } = stores()
  const currentUser = user$()
  const { id, email, username } = $currentUser || {}

  const settings = {
    app_id: 'cyjjko9u',
    user_id: id,
    name: username,
    email,
    action_color: '#14c393', // jungle-green
  }

  let isBooted = false

  $: if (process.browser) {
    update($page)
  }

  function update() {
    if (isBooted) {
      const { id, email, username } = $currentUser || {}

      settings.user_id = id
      settings.name = username
      settings.email = email

      window.Intercom('update')
    }
  }

  onMount(() => {
    window.Intercom('boot', settings)
    window.intercomSettings = settings
    isBooted = true
  })
</script>

<template lang="pug">
+html("`<script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==='function'){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/cyjjko9u';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()</script>`")
</template>

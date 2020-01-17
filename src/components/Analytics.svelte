<template lang="pug">
svelte:head
  +if('process.env.BACKEND_URL !== "https://api-stage.santiment.net"')
    script(async, src="https://www.googletagmanager.com/gtag/js?id=UA-100571693-11")

    script
      .
        window.dataLayer = window.dataLayer || []
        function gtag() {
          dataLayer.push(arguments)
        }
        gtag('js', new Date())
        gtag('config', 'UA-100571693-11')
        gtag('config', 'UA-100571693-1')
</template>

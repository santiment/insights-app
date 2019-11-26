<script>
  export let suggestion
  const { name, ticker, logoUrl } = suggestion

  const defaultLogoUrl =
    'https://production-sanbase-images.s3.eu-central-1.amazonaws.com/sprite/default_project_logo.png'
</script>

<template lang="pug">
include /ui/mixins

img(src='{logoUrl || defaultLogoUrl}', alt='Project logo', width='16', height='16')
|{name}
span ({ticker})

</template>

<style lang="scss">
  @import '@/mixins';

  span {
    color: var(--waterloo);
    margin-left: 3px;
  }

  img {
    min-width: 16px;
    min-height: 16px;
    margin-right: 5px;
  }
</style>

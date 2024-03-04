<script context="module">
  export async function preload(page) {
    const { slug } = page.params

    return this.redirect(302, 'https://app.santiment.net/profile/' + slug)
  }
</script>

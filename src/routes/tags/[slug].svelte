<script context="module">
  export async function preload(page) {
    const { slug } = page.params
    return this.redirect(302, `/?tags=${slug}`)
  }
</script>

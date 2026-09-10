<script context="module">
  import { getSanbaseHref } from '@/utils/url'

  export async function preload(page) {
    const { slug } = page.params

    this.redirect(301, getSanbaseHref(`/insights/read/${slug}`))
  }
</script>

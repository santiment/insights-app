<script context="module">
  // import { redirectLoggedInUser } from '@/flow/redirect'
  import { getSanbaseHref } from '@/utils/url'

  export function preload() {
    this.redirect(303, getSanbaseHref(`/sign-up?from=${encodeURIComponent('/insights')}`))
  }
</script>

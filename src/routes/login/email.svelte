<script context="module">
  import { getSanbaseHref } from '@/utils/url'

  export function preload() {
    this.redirect(303, getSanbaseHref(`/login?from=${encodeURIComponent('/insights')}`))
  }
</script>

<script>
  import EmailLogin from 'webkit/ui/LoginPrompt/EmailLogin.svelte'
</script>

<EmailLogin />

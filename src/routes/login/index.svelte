<script context="module">
  import { getSanbaseHref } from '@/utils/url'

  export function preload() {
    this.redirect(303, getSanbaseHref(`/login?from=${encodeURIComponent('/insights')}`))
  }
</script>

<script>
  // import { goto } from '@sapper/app'
  import LoginPrompt from 'webkit/ui/LoginPrompt/index.svelte'
  import { startEthLoginFlow } from '@/flow/login'

  function onMetamaskClick() {
    return startEthLoginFlow().then(() => {
      // goto(getPostponedPaymentInsight() || '/')
    })
  }
</script>

<LoginPrompt title="Welcome back" {onMetamaskClick} />

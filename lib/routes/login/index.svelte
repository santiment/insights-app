<script>
  // import { goto } from '@sapper/app'
  import LoginPrompt from 'san-webkit/lib/ui/LoginPrompt/index.svelte'
  import { startEthLoginFlow } from './../../flow/login'

  function onMetamaskClick() {
    return startEthLoginFlow().then(() => {
      // goto(getPostponedPaymentInsight() || '/')
    })
  }
</script>

<LoginPrompt title="Welcome back" {onMetamaskClick} />

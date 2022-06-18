<script>
  import AccountStatus from 'webkit/ui/AccountStatus.svelte'
  import AccountDropdown from 'webkit/ui/AccountDropdown/index.svelte'
  import { ui } from '@/stores/ui'
  import { currentUser as user } from '@/stores/user'
  import { customerData$ } from '@/stores/customerData'
  import { startLogoutFlow } from '@/flow/logout'

  $: currentUser = $user

  function onLogoutClick() {
    startLogoutFlow()
  }
</script>

<AccountStatus
  {currentUser}
  subscription={currentUser && currentUser.subscription}
  customerData={$customerData$}
/>

<AccountDropdown {currentUser} {ui} {onLogoutClick} />

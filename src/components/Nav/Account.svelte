<script>
  import AccountStatus from 'webkit/ui/AccountStatus.svelte'
  import AccountDropdown from 'webkit/ui/AccountDropdown/index.svelte'
  import { ui } from '@/stores/ui'
  import { currentUser as user } from '@/stores/user'
  import { startLogoutFlow } from '@/flow/logout'

  $: currentUser = $user

  function onLogoutClick() {
    startLogoutFlow()
  }
</script>

<AccountStatus {currentUser} />

<AccountDropdown {currentUser} {ui} {onLogoutClick} />

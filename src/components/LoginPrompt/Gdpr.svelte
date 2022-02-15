<script>
  import InputWithIcon from 'webkit/ui/InputWithIcon.svelte'
  import Checkbox from 'webkit/ui/Checkbox.svelte'
  import Section from './Section.svelte'
  import { currentUser } from '@/stores/user'

  const constraints = { minlength: 2 }

  let isActive = false

  $: username = $currentUser && $currentUser.username
  $: isDisabled = !isActive || !username

  function onBlur() {
    if (username) return
    username = $currentUser && $currentUser.username
  }

  function onInput({ currentTarget }) {
    username = currentTarget.value
  }

  function onSubmit() {
    if (isDisabled) return
  }
</script>

<Section title="Welcome to Insights">
  <div class="c-waterloo body-2">
    <p>Please type your username to access all features</p>

    <InputWithIcon
      {constraints}
      value={username}
      placeholder="username"
      class="body-3"
      on:input={onInput}
      on:blur={onBlur}>
      <span slot="left">@</span>
    </InputWithIcon>

    <p>Review and accept our Privacy Policy to continue using Sanbase</p>
  </div>

  <button class="btn row v-center body-2" on:click={() => (isActive = !isActive)}>
    <Checkbox class="mrg-m mrg--r" {isActive} />
    I accept
    <a href="https://santiment.net/terms" target="_blank" rel="noopener noreferrer">Terms</a> and
    <a href="https://app.santiment.net/privacy-policy" target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a>
  </button>

  <button class="btn-1 btn--l mrg-xxl mrg--t" class:disabled={isDisabled} on:click={onSubmit}
    >Continue</button>
</Section>

<style>
  div {
    --left: 25px;
  }

  p {
    margin: 16px 0;
  }

  button {
    min-width: 188px;
  }

  span {
    position: absolute;
    left: 9px;
    color: var(--green);
  }

  a {
    color: var(--green);
    margin: 0 4px;
  }
  a:hover {
    color: var(--green-hover);
  }
</style>

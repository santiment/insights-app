<script>
  import Section from './Section.svelte'
  import EmailForm from './EmailForm.svelte'
</script>

<Section
  title="Welcome back"
  bottomLabel="Or choose"
  bottomAction="another log in option"
  bottomHref="/login">
  <p class="body-2 mrg-xxl mrg--b c-waterloo">
    Log in to your Sanbase account to access additional features of our platform
  </p>

  <EmailForm />
</Section>

<style>
  p {
    max-width: 320px;
  }
</style>

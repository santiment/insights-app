<script context="module">
  import { redirectLoggedInUser } from './../flow/redirect'

  export function preload(_, session) {
    redirectLoggedInUser(this, session)
  }
</script>

<script>
  import SignUp from 'san-webkit/lib/ui/LoginPrompt/SignUp.svelte'
  import Layout from './login/_layout.svelte'
</script>

<Layout>
  <SignUp title="Welcome to Insights" />
</Layout>

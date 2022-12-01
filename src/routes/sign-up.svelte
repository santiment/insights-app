<script context="module">
  import { redirectLoggedInUser } from '@/flow/redirect'

  export function preload(_, session) {
    redirectLoggedInUser(this, session)
  }
</script>

<script>
  import SignUp from 'webkit/ui/LoginPrompt/SignUp.svelte'
  import Layout from './login/_layout.svelte'
</script>

<Layout>
  <SignUp title="Welcome to Insights" />
</Layout>

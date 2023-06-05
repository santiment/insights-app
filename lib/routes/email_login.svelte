<script context="module">
  export function preload(_, session) {
    if (session.currentUser) return this.redirect(302, '')
  }
</script>

<script>
  import { goto } from '@sapper/app'
  import { parse } from 'san-webkit/lib/utils/url'
  // import { getPostponedPaymentInsight } from './../logic/insights'
  import { currentUser } from './../stores/user'
  import { customerData$ } from './../stores/customerData'
  import { verifyEmailMutation } from './../api/user'

  if (process.browser) {
    const { email, token } = parse(window.location.search)
    verifyEmailMutation(email, token).then((data) => {
      currentUser.set(data)
      customerData$.refetch()
      goto(data.privacyPolicyAccepted ? '/' : '/gdpr')

      // goto(data.privacyPolicyAccepted ? getPostponedPaymentInsight() || '/' : '/gdpr')
    })
  }
</script>

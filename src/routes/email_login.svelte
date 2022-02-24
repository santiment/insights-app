<script context="module">
  export function preload(_, session) {
    if (session.currentUser) return this.redirect(302, '')
  }
</script>

<script>
  import { goto } from '@sapper/app'
  import { parse } from 'webkit/utils/url'
  // import { getPostponedPaymentInsight } from '@/logic/insights'
  import { currentUser } from '@/stores/user'
  import { verifyEmailMutation } from '@/api/user'

  if (process.browser) {
    const { email, token } = parse(window.location.search)
    verifyEmailMutation(email, token).then((data) => {
      currentUser.set(data)
      goto(data.privacyPolicyAccepted ? '/' : '/gdpr')

      // goto(data.privacyPolicyAccepted ? getPostponedPaymentInsight() || '/' : '/gdpr')
    })
  }
</script>

export function redirectToLoginPage(app, session) {
  if (session.currentUser) return false

  app.redirect(302, '/login')
  return true
}

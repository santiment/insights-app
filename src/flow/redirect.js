export function redirectLoggedInUser(app, session) {
  if (session.currentUser) return app.redirect(302, '/')
}

export function redirectToLoginPage(app, session) {
  if (session.currentUser) return false

  app.redirect(302, '/login')
  return true
}

export function redirectNonAuthor(app, session, insight) {
  if (+session.currentUser.id === +insight.user.id) return false

  app.redirect(302, '/')
  return true
}

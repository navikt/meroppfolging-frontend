'use client'

export const loginUser = (): void => {
  if (typeof window === 'undefined') return

  window.location.href = `/syk/meroppfolging/oauth2/login?redirect=${window.location.pathname}`
}

import * as client from 'openid-client'

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  const oidcConfig = event.context.oidcConfig
  const config = useRuntimeConfig()

  const accessToken: string | undefined = cookies.access_token
  const refreshToken: string | undefined = cookies.refresh_token

  if (accessToken) {
    client.tokenRevocation(oidcConfig, accessToken)
    setCookie(event, 'access_token', '', {
      httpOnly: true,
      maxAge: 0,
      domain: config.server.accessCookieDomain,
      secure: config.server.accessCookieDomain !== 'localhost',
    })
  }
  if (refreshToken) {
    client.tokenRevocation(oidcConfig, refreshToken)
    setCookie(event, 'refresh_token', '', {
      httpOnly: true,
      maxAge: 0,
      domain: config.server.refreshCookieDomain,
      secure: config.server.refreshCookieDomain !== 'localhost',
    })
  }
})

import * as client from 'openid-client'

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  const oidcConfig = event.context.oidcConfig
  const config = useRuntimeConfig()

  let refreshToken: string | undefined = cookies.refresh_token

  if (!refreshToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const tokens = await client.refreshTokenGrant(oidcConfig, refreshToken)
  const accessToken = tokens.access_token

  setCookie(event, 'access_token', accessToken, {
    httpOnly: config.server.refreshCookieDomain !== 'localhost',
    maxAge: tokens.expires_in,
    domain: config.server.accessCookieDomain,
    secure: config.server.accessCookieDomain !== 'localhost',
  })

  if (tokens.refresh_token) {
    refreshToken = tokens.refresh_token
    setCookie(event, 'refresh_token', refreshToken, {
      httpOnly: config.server.refreshCookieDomain !== 'localhost',
      // The max age for this is determined by the auth server
      // and must be known in advance.
      maxAge: Number.parseInt(config.server.refreshTokenDurationSeconds),
      domain: config.server.refreshCookieDomain,
      secure: config.server.refreshCookieDomain !== 'localhost',
    })
  }

  return { expiresIn: tokens.expires_in }
})

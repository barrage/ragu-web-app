import * as client from 'openid-client'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    })
  }

  const config = useRuntimeConfig()
  const oidcConfig = event.context.oidcConfig

  // currentUri has to be the exact URL the user was redirected to
  // and includes the code and state parameters
  const { currentUri, state, pkceCodeVerifier } = JSON.parse(
    await readBody(event),
  )

  const response = await client.authorizationCodeGrant(
    oidcConfig,
    new URL(currentUri),
    { expectedState: state, pkceCodeVerifier, idTokenExpected: true },
  )

  const claims = response.claims()

  if (!claims) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Access token does not contain expires_in field',
    })
  }

  const user = await client.fetchUserInfo(
    oidcConfig,
    response.access_token,
    claims.sub,
  )

  setCookie(event, 'access_token', response.access_token, {
    httpOnly: true,
    maxAge: response.expires_in,
    domain: config.server.accessCookieDomain,
    secure: config.server.accessCookieDomain !== 'localhost',
  })

  if (response.refresh_token) {
    setCookie(event, 'refresh_token', response.refresh_token, {
      httpOnly: true,
      // The max age for this is determined by the auth server
      // and must be known in advance.
      maxAge: Number.parseInt(config.server.refreshTokenDurationSeconds),
      domain: config.server.refreshCookieDomain,
      secure: config.server.refreshCookieDomain !== 'localhost',
    })
  }

  return user
})

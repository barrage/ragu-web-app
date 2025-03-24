import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  interface AutentikUsersResponse {
    results: any[]
  }
  const config = useRuntimeConfig()
  const cookies = parseCookies(event)

  const accessToken = cookies.access_token
  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  try {
    const response = await $fetch(`${config.public.apiAutentikUrl}/api/v3//core/users/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    })

    const users = (response as AutentikUsersResponse).results

    return users
  }
  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.message || 'Failed to fetch Authentik users',
    })
  }
})

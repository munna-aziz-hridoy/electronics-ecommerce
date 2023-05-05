import { serverUrl } from '@config/index'
import { setToken } from './token'

// User Registration
export const resisterUser = async (body) => {
  const res = await fetch(`${serverUrl}/api/user`, {
    method: 'POST',
    body: JSON.stringify({
      ...body,
    }),
  })
  const json = await res.json()
  if (json?.token?.length > 10) {
    setToken(json.token)
  }
}

// User Login
export const loginUser = async (body) => {
  const res = await fetch(`${serverUrl}/api/user/login`, {
    method: 'POST',
    body: JSON.stringify({
      ...body,
    }),
  })
  const json = await res.json()
  if (json?.token?.length > 10) {
    setToken(json.token)
  }
}

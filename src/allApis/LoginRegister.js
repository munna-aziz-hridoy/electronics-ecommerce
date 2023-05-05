import { serverUrl } from '@config/index'
import { toast } from 'react-hot-toast'
import { setToken } from './token'

// User Registration
export const resisterUser = async (data) => {
  const res = await fetch(`${serverUrl}/api/user`, {
    method: 'POST',
    body: JSON.stringify({
      ...data,
    }),
  })
  const json = await res.json()
  if (json?.token?.length > 1) {
    setToken(json.token)
  }
}

// User Login
export const loginUser = async (data) => {
  const res = await fetch(`${serverUrl}/api/user/login`, {
    method: 'POST',
    body: JSON.stringify({
      ...data,
    }),
  })
  const json = await res.json()
  if (json?.token?.length > 1) {
    setToken(json.token)
  }
}

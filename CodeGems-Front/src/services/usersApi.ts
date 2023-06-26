import api from './api'

export async function getUser(userId: number) {
  return (await api.get(`/user/${userId}`)).data
}

export async function getUserFromSession(body: {
  token: string
  userType?: string
  email: string
}) {
  return (await api.post(`/user`, body)).data
}

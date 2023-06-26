import api from './api'

export async function getUser(userId: number) {
  return (await api.get(`/user/${userId}`)).data
}

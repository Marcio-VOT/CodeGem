import api from './api'

export async function getGithubUserData(
  code: string | null,
  token: string | null,
) {
  return (await api.post('/login/oauth-github', { code, token })).data
}

export async function getGoogleUserData(code?: string, token?: string) {
  return (await api.post('/login/oauth-google', { code, token })).data
}

import * as userRepository from '@/repositories/user-repository'

export async function userDataFromId(userId: number) {
  return await userRepository.getUserById(userId)
}

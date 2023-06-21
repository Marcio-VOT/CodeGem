import { ApplicationError } from '@/protocols'

export function invalidProviderError(): ApplicationError {
  return {
    name: 'InvalidProviderError',
    message: 'Unrecognized provider',
  }
}

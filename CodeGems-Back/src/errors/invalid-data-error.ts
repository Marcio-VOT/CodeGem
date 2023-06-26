import { ApplicationError } from '@/protocols'

type ApplicationInvalidateDataError = ApplicationError & {
  details: string[]
}

export function invalidDataError(
  details: string[] = [],
): ApplicationInvalidateDataError {
  return {
    name: 'InvalidDataError ',
    message: 'Invalid data',
    details,
  }
}

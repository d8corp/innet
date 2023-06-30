import { useHandler } from '../../utils'

export function useNewHandler () {
  return Object.create(useHandler())
}

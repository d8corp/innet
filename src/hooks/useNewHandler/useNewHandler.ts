import { extendHandler, useHandler } from '../../utils'

export function useNewHandler () {
  return extendHandler(useHandler())
}

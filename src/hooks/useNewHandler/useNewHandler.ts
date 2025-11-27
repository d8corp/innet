import { useHandler } from '../../innet'
import { extendHandler } from '../../utils'

export function useNewHandler () {
  return extendHandler(useHandler())
}

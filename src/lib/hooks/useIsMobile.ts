import { mq } from '@styles/utils'
import { useMediaQuery } from '@uidotdev/usehooks'

export const useIsMobile = () => useMediaQuery(mq.upTo('md'))

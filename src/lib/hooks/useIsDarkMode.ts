import { useMediaQuery } from './useMediaQuery'

export const useIsDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')

import { useMediaQuery } from 'lib/hooks/useMediaQuery'

export const useIsDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')

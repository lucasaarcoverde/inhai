import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
} as ThemeConfig

const theme = extendTheme({ config })

export default theme

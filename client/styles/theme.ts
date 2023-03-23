import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const fonts = {
  heading: `sans-serif`,
  body: `sans-serif`,
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  fonts,
  config,
})

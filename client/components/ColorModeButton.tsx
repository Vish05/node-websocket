import { IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      colorScheme='gray'
      onClick={toggleColorMode}
      aria-label='Toggle color mode'
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    />
  )
}

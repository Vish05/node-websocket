import { ColorModeButton } from '../../components/ColorModeButton'
import { Logo } from '../../components/Logo'
import { PlayingCardsDisplay } from '../../components/PlayingCardsDisplay'
import { StartGameForm } from '../../components/StartGameForm'
import { Box, Heading, Stack, useColorModeValue, HStack } from '@chakra-ui/react'
import type { NextPage } from 'next'

export const Home: NextPage = () => {
  const backgroundColor = useColorModeValue('#FAFEFA', '#171923')

  return (
    <Box backgroundColor={backgroundColor} h='100vh' overflow='clip'>
      <HStack w='full' py='8' px='75' justify='space-between'>
        <Logo />
        <ColorModeButton />
      </HStack>
      <Stack align='center'>
        <Stack align='center' w='container.lg' my={24}>
          <Heading mb={20} size='4xl' textAlign={'center'}>
            Who said you can’t play card games at work?
          </Heading>
          <StartGameForm />
        </Stack>
        <PlayingCardsDisplay />
      </Stack>
    </Box>
  )
}

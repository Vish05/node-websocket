import { Box, VStack, Flex, Image, useColorModeValue } from '@chakra-ui/react'
import { NextPage } from 'next'

//import { useGame } from './queries'

import { Header } from '../../components/Header'
import { PointPicker } from '../../components/PointPicker'
import { Table } from '../../components/Table'
import { ResultsSummary } from '../../components/ResultsSummary'
import { Spectators } from '../../components/Spectators'
import { Logo } from '../../components/Logo'

export const Game: NextPage = () => {
  //const { game, players } = useGame()
  const game = {
    revealed: true,
    name: "poker"
  }
  const players = {}
  const borderColor = useColorModeValue('gray.100', 'gray.600')
  const bgColor = useColorModeValue('#FAFEFA', 'gray.700')

  if (!game || !players) {
    return <Box>Loading...</Box>
  }

  return (
    <Box>
      <Flex>
        <Box flex={1} bgColor={bgColor} h='100vh'>
          <Flex direction='column' h='100vh'>
            <Box w='full' py='8' px='75'>
              <Logo />
            </Box>
            <Box flex={1}>{players && <Table />}</Box>
            {game?.revealed && <ResultsSummary />}
          </Flex>
        </Box>
        <Box w='500px' borderLeft='3px solid' borderColor={borderColor}>
          <Header name={game.name} />
          <VStack spacing={4} align='stretch' px='9'>
            <Box py='9'>
              <PointPicker />
            </Box>
            <Spectators />
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

import { Flex, Text, VStack } from '@chakra-ui/react';
//import { useGame } from '../modules/games/queries'
import Card from './Cards/Card'

export const ResultsSummary = () => {
  //const { players } = useGame();
  const players = [
    {
      points: 3
    }
  ]


  const points = (players || []).map(({ points }) => points).filter((value) => !!value)

  const occurrences = points.reduce(function (acc: Record<number, number>, curr: number) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc
  }, {})

  const sum = points.reduce((a, b) => a + b, 0)
  const avg = sum / points.length || 0

  return (
    <Flex justifyContent='center' gap='40px' pb={10}>
      {Object.keys(occurrences).map((points) => {
        const number = parseInt(points)
        if (!number) return
        return (
          <VStack key={number}>
            <Card cardNumber={number} disabled={false} />
            <Text>
              {occurrences[number]} Vote{occurrences[number] > 1 ? 's' : ''}
            </Text>
          </VStack>
        )
      })}
      <VStack>
        <Text fontSize='2xl'>Average:</Text>
        <Text fontSize='5xl' fontWeight='semibold'>
          {parseFloat(avg.toFixed(1))}
        </Text>
      </VStack>
    </Flex>
  )
}

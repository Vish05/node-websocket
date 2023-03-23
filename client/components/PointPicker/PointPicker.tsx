import { Button, Grid, Heading, Stack } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
//import { setPoints, setRevealed, resetPoints } from '../../modules/games/mutations'
//import { useGame, useMe } from '../../modules/games/queries'
import Card from '../Cards/Card'

const cards = [0, 1, 2, 3, 5, 8, 13, 21]

export const PointPicker: FC = () => {
  //const { game, players } = useGame()
  const players = [
    {
      points: 3
    }
  ]
  const me =
  {
    points: 3,
    isSpectator: false
  }


  const game =
  {
    revealed: false
  }

  //const { me } = useMe()
  const [currentPoints, setCurrentPoints] = useState<Number | null>()

  // at least one player has to have added points
  const noGamePoints = (players || []).every(({ points }) => points === null)

  useEffect(() => {
    setCurrentPoints(me?.points)
  }, [me?.points])

  if (!me) {
    return <div>Loading...</div>
  }

  const onSelectPoints = async (points: number) => {
    setCurrentPoints(points)
    //await setPoints({ points, playerSessionId: me.id, gameId: game.id })
  }

  const handleReveal = async () => {
    //setRevealed({ gameId: game.id })
  }

  const handleReset = async () => {
    setCurrentPoints(null)
    //await resetPoints({ gameId: game.id })
  }

  return (
    <>
      <Heading as='h2' size='md' mb='24px'>
        Pick your points 👇
      </Heading>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {cards.map((points, i) => (
          <Card
            key={i}
            cardNumber={points}
            isSelected={currentPoints == points}
            onClick={() => onSelectPoints(points)}
            disabled={!!game?.revealed || me.isSpectator}
          />
        ))}
      </Grid>
      <Stack mt='45px'>
        {game?.revealed ? (
          <Button colorScheme='green' onClick={handleReset}>
            Reset points ♺
          </Button>
        ) : (
          <Button colorScheme='green' onClick={handleReveal} disabled={noGamePoints}>
            Reveal points 👀
          </Button>
        )}
      </Stack>
    </>
  )
}

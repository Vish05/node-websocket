import { Flex, Text, FlexProps } from '@chakra-ui/react'

import { PlayerProps } from './Player.types'
//import { useGame } from '../../modules/games/queries'
import MiniCard from '../Cards/MiniCard'
import { ChairIcon } from './ChairIcon'

type CardPositionType = {
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
}

export default function Player({ ready, playerName, position, points }: PlayerProps) {
  //const { game } = useGame();
  const game = {
    revealed: false
  }
  let rotation = 0
  let direction = 'column'
  let nameRotation = 0
  let cardPosition: CardPositionType = { marginTop: '100px' }

  if ([5, 7].includes(position)) {
    rotation = 270
    direction = 'row'
    nameRotation = 270
    cardPosition = { marginLeft: '120px' }
  }
  if ([6, 8].includes(position)) {
    rotation = 90
    direction = 'row-reverse'
    nameRotation = 90
    cardPosition = { marginRight: '120px' }
  }
  if ([3, 4, 11, 12].includes(position)) {
    rotation = 180
    cardPosition = { marginBottom: '100px' }
  }
  if (position === 13) {
    rotation = 315
    cardPosition = {
      marginTop: '80px',
      marginLeft: '100px',
    }
  }
  if (position === 14) {
    rotation = 45
    cardPosition = {
      marginTop: '80px',
      marginRight: '100px',
    }
  }
  if (position === 15) {
    rotation = 230
    cardPosition = {
      marginBottom: '80px',
      marginLeft: '100px',
    }
  }
  if (position === 16) {
    rotation = 135
    cardPosition = {
      marginBottom: '80px',
      marginRight: '100px',
    }
  }

  if ([3, 4, 11, 12, 15, 16].includes(position)) direction = 'column-reverse'

  const shouldShowPoints = ready && game?.revealed

  return (
    <Flex direction={direction as FlexProps['flexDirection']} align='center' position={'relative'}>
      <div style={{ transform: `rotate(${nameRotation}deg)` }}>
        <Text fontSize='2xl' fontWeight='bold' my={2}>
          {playerName}
        </Text>
      </div>
      <div style={{ transform: `rotate(${rotation}deg)` }}>
        <ChairIcon isReady={ready} />
      </div>
      {shouldShowPoints && (
        <div
          style={{
            position: 'absolute',
            ...cardPosition,
          }}
        >
          <MiniCard cardNumber={points} />
        </div>
      )}
    </Flex>
  )
}

import { Flex, Text } from '@chakra-ui/react'
import { SuitIcon } from '../SuitIcon'
import { getSuitFromNumber } from './helpers/getSuitFromNumber'

export interface MiniCardProps {
  cardNumber: number
}

export default function MiniCard({ cardNumber }: MiniCardProps) {
  const suit = getSuitFromNumber(cardNumber)
  const color = ['diamond', 'heart'].includes(suit) ? '#A1312D' : '#31312F'
  const CardSuitIcon = () => <SuitIcon color={color} suit={suit} isMini />
  return (
    <Flex
      _hover={{ transform: `rotate(2deg)` }}
      boxShadow={'lg'}
      h='80px'
      w='56px'
      p='5px'
      bgColor='#FAEE98'
      borderRadius={5}
      direction='column'
      justifyContent='space-between'
    >
      <Flex>
        <CardSuitIcon />
      </Flex>
      <Text align='center' fontSize='1.75rem' fontWeight='semibold' color='#31312F'>
        {cardNumber}
      </Text>
      <Flex justifyContent='flex-end'>
        <CardSuitIcon />
      </Flex>
    </Flex>
  )
}

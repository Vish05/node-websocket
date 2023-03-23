import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { SuitIcon } from '../SuitIcon'
import { getSuitFromNumber } from './helpers/getSuitFromNumber'

export interface CardProps {
  cardNumber: number
  isSelected?: boolean
  onClick?: () => void
  disabled: boolean
}

export default function Card({ cardNumber, isSelected, onClick, disabled }: CardProps) {
  const fontColor = useColorModeValue('white', 'gray.800')
  const defaultColor = useColorModeValue('green.500', 'green.200')
  const selectedHeartColor = useColorModeValue('white', 'green.800')

  const CardSuitIcon = () => (
    <SuitIcon color={isSelected ? selectedHeartColor : '#5D9759'} suit={getSuitFromNumber(cardNumber)} opacity='0.5' />
  )

  return (
    <Flex
      _hover={disabled ? {} : { transform: `rotate(2deg)` }}
      boxShadow={!isSelected && disabled ? 'initial' : 'lg'}
      filter={`opacity(${disabled && !isSelected ? '20' : '100'}%)`}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      h='105px'
      w='74px'
      p='6px'
      border='4px solid'
      borderColor={defaultColor}
      borderRadius={10}
      onClick={disabled ? () => { } : onClick}
      backgroundColor={isSelected ? defaultColor : 'transparent'}
      direction='column'
      justifyContent='space-between'
    >
      <Flex>
        <CardSuitIcon />
      </Flex>
      <Text align='center' fontSize='2.25rem' fontWeight='semibold' color={isSelected ? fontColor : defaultColor}>
        {cardNumber}
      </Text>
      <Flex justifyContent='flex-end'>
        <CardSuitIcon />
      </Flex>
    </Flex>
  )
}

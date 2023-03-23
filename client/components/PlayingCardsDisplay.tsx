import { Box, Flex, Image } from '@chakra-ui/react'

export const PlayingCardsDisplay = () => {
  return (
    <Flex minW='80%' gap={8}>
      <Box flex={1}>
        <Image src='/assets/yellow-diamond.svg' alt='Diamond card' />
      </Box>
      <Box flex={1}>
        <Image src='/assets/yellow-club.svg' alt='Diamond card' />
      </Box>
      <Box flex={1}>
        <Image src='/assets/yellow-heart.svg' alt='Diamond card' />
      </Box>
      <Box flex={1}>
        <Image src='/assets/yellow-spade.svg' alt='Diamond card' />
      </Box>
    </Flex>
  )
}

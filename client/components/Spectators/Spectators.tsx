import { Heading, Avatar, Tooltip, Box, HStack } from '@chakra-ui/react'
import { FC } from 'react'
//import { useGame } from '../../modules/games/queries'

export const Spectators: FC = () => {
  //const { players } = useGame()
  const players = [
    {
      isSpectator: false,
      name: "vishal"
    }
  ]

  const spectators = players?.filter((player) => player.isSpectator)

  if (!spectators?.length) return null

  return (
    <Box>
      <Heading as='h2' size='md' mb='24px'>
        Spectators 👀
      </Heading>
      <HStack gap={2}>
        {spectators.map(({ name }, i) => (
          <Tooltip key={`avatar-${i}`} label={name}>
            <Avatar name={name} />
          </Tooltip>
        ))}
      </HStack>
    </Box>
  )
}

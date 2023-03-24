import { useContext } from 'react'
import { Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useEffect } from 'react'

//import { useGame } from './queries'

import { Game } from './Game'
import { createPlayer } from './mutations/createPlayer'
import { JoinGameModal } from '../players/components/JoinGameModal';
import { AuthContext } from "../../context/authContext"

export const GameRouter: NextPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user = {
    "uid": "123",
    displayName: ""
  };
  const { game, token } = useContext(AuthContext);
  //const { players, game, isLoading, error } = useGame()
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: !user?.displayName })

  // useEffect(() => {
  //   // async function checkAndJoinGame() {
  //   //   const isUserAlreadyInGame = players?.find((player) => player.userId === user?.uid)
  //   //   const hasDisplayName = user?.displayName

  //   //   if (players && hasDisplayName && !isUserAlreadyInGame) {
  //   //     await createPlayer({ gameId: game.id })
  //   //   }
  //   // }
  //   // checkAndJoinGame()
  // }, [game.id, user, players])

  // if (isLoading) {
  //   return <Spinner />
  // }

  // if (error) {
  //   return <Text>Error</Text>
  // }

  if (!user?.displayName) {
    return <JoinGameModal isOpen={isOpen} onClose={onClose} />
  }

  return <Game />
}

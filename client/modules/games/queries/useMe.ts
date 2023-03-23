//import { useGame } from './useGame'

export function useMe() {
  //const { players, isLoading, error } = useGame()
  const isLoading = false;
  const error = ''
  //const ownPlayer = players?.find((player) => player.userId === auth.currentUser?.uid)
  const ownPlayer = [
    {
      userId: "1233",

    }
  ]

  return {
    me: ownPlayer,
    isLoading,
    error,
  }
}

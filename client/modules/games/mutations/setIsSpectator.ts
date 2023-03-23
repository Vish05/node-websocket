interface SetIsSpectatorProps {
  gameId: string
  playerSessionId: string
  isSpectator: boolean
}

export function setIsSpectator({ gameId, playerSessionId, isSpectator }: SetIsSpectatorProps)  {
  console.log("setIsSpectator")
}

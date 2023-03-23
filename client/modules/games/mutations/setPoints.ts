

interface SetPointsProps {
  gameId: string
  playerSessionId: string
  points: number | null
}

export async function setPoints({ gameId, playerSessionId, points }: SetPointsProps): Promise<void> {
  
}

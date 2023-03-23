interface CreatePlayer {
  gameId: string
  isSpectator?: boolean
}

interface GameDetails {
  playerId: string
}

export function createPlayer({ gameId, isSpectator = false }: CreatePlayer) {
  // if (!auth.currentUser?.displayName) {
  //   throw new Error('User has no display name')
  // }

  // const playerRef = await addDoc(collection(db, COLLECTION_NAMES.games, gameId, COLLECTION_NAMES.players), {
  //   name: auth.currentUser.displayName,
  //   userId: auth.currentUser?.uid,
  //   isSpectator,
  // })

  // const player = await getDoc(playerRef)

  // if (!player.exists()) {
  //   throw new Error('Player failed to create')
  // }

  return {
    playerId: "12343",
  }
}

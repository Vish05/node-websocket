

interface ResetPointsProps {
  gameId: string
}

export  function resetPoints({ gameId }: ResetPointsProps)  {
  // const batch = writeBatch(db)
  // const docs = await getDocs(collection(db, COLLECTION_NAMES.games, gameId, COLLECTION_NAMES.players))

  // docs.forEach((doc) => {
  //   batch.update(doc.ref, { points: null })
  // })

  // batch.update(doc(db, COLLECTION_NAMES.games, gameId), {
  //   revealed: false,
  // })

  // await batch.commit()
}

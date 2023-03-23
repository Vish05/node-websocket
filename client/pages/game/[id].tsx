import { Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GameRouter } from '../../modules/games/'

function GameCheck() {
	const router = useRouter()
	const { id } = router.query

	if (!id) {
		return <Spinner />
	}

	return <GameRouter />
}

export default GameCheck

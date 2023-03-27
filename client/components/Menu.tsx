import { useContext } from 'react'
import {
  HStack,
  useToast,
  Menu as ChakraMenu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useDisclosure,
  Link,
  Switch,
  Text,
} from '@chakra-ui/react'
import { ChevronDownIcon, CopyIcon, EditIcon, ExternalLinkIcon, ViewIcon } from '@chakra-ui/icons'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { auth } from '@/core/firebase'
import { ChangeNameModal } from '../modules/players/components/ChangeNameModal'
//mport { useGame, useMe } from '../modules/games/queries'
import { setIsSpectator } from '../modules/games/mutations/setIsSpectator'
import { ColorModeButton } from './ColorModeButton'
import { AuthContext } from '../context/authContext'
import { useRouter } from "next/router";


export const Menu = () => {
  //const { me } = useMe()
  //const { game } = useGame();
  const router = useRouter();
  const { id: curretGameID } = router.query;
  const { user } = useContext(AuthContext);


  console.log(typeof curretGameID)

  const game =
  {
    points: 3,
    isSpectator: false,
    id: curretGameID
  }

  //const [user] = useAuthState(auth);
  const toast = useToast()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const copyGameLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: 'Game link copied to clipboard!',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ChakraMenu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {user?.name}
        </MenuButton>
        <ColorModeButton />
        <MenuList>
          <MenuItem onClick={onOpen} icon={<EditIcon />}>
            Change display name
          </MenuItem>
          <MenuItem
            closeOnSelect={false}
            onClick={() => setIsSpectator({ isSpectator: !user.isSpectator, playerSessionId: user.id, gameId: '666abfaf-8868' })}
            icon={<ViewIcon />}
          >
            <HStack justify='space-between' w='100%'>
              <Text>Spectator mode</Text>
              <Switch colorScheme='green' isChecked={user.isSpectator} defaultChecked={user.isSpectator} />
            </HStack>
          </MenuItem>
          <MenuItem onClick={copyGameLink} icon={<CopyIcon />}>
            Copy game link
          </MenuItem>
          <MenuItem as={Link} href='https://forms.office.com/r/A9vpz7cwuh' isExternal icon={<ExternalLinkIcon />}>
            Submit feedback or suggestions
          </MenuItem>
        </MenuList>
      </ChakraMenu>
      <ChangeNameModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

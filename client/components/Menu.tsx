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

export const Menu = () => {
  //const { me } = useMe()
  //const { game } = useGame();

  const game =
  {
    points: 3,
    isSpectator: false,
    id: "22"
  }


  const me = {
    points: 3,
    isSpectator: false,
    id: "233"
  }

  //const [user] = useAuthState(auth);
  const user = {
    "uid": "123",
    displayName: "A"
  };
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

  if (!me) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ChakraMenu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {user?.displayName}
        </MenuButton>
        <ColorModeButton />
        <MenuList>
          <MenuItem onClick={onOpen} icon={<EditIcon />}>
            Change display name
          </MenuItem>
          <MenuItem
            closeOnSelect={false}
            onClick={() => setIsSpectator({ isSpectator: !me.isSpectator, playerSessionId: me.id, gameId: game.id })}
            icon={<ViewIcon />}
          >
            <HStack justify='space-between' w='100%'>
              <Text>Spectator mode</Text>
              <Switch colorScheme='green' isChecked={me.isSpectator} defaultChecked={me.isSpectator} />
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

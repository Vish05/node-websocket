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
import { ChangeNameModal } from '../modules/players/components/ChangeNameModal'
import { setIsSpectator } from '../modules/games/mutations/setIsSpectator'
import { ColorModeButton } from './ColorModeButton'
import { useGame } from '../hooks/useGame'


export const Menu = () => {
  const { game, user } = useGame()
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

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'

//import { useGame, useMe } from 'src/modules/games/queries'
//import { updateDisplayName } from '../../mutations/updateDisplayName'

interface ChangeNameModalProps {
  isOpen: boolean
  onClose: () => void
}

type Inputs = {
  displayName: string
}

export function ChangeNameModal({ isOpen, onClose }: ChangeNameModalProps) {
  // const { game } = useGame()
  // const { me } = useMe();
  const me = {
    name: ""
  }
  const game = {
    revealed: false
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // await updateDisplayName({
    //   name: data.displayName,
    //   gameId: game.id,
    //   playerSessionId: me?.id,
    // })

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change display name</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <FormControl isInvalid={!!errors.displayName}>
            <ModalBody>
              <FormLabel htmlFor='name' hidden={true}>
                Display name
              </FormLabel>
              <Input
                id='display-name'
                size='lg'
                placeholder={me?.name || 'Enter your name'}
                {...register('displayName', {
                  required: 'Please enter your name',
                })}
              />
              <FormErrorMessage>{errors.displayName && errors.displayName.message}</FormErrorMessage>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='green' isLoading={isSubmitting} type='submit'>
                Save
              </Button>
            </ModalFooter>
          </FormControl>
        </form>
      </ModalContent>
    </Modal>
  )
}

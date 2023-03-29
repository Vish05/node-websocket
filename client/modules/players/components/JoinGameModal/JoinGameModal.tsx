import { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Switch,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGame } from "../../../../hooks/useGame";

interface JoinGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName?: string | null | undefined;
}

type Inputs = {
  displayName: string;
  isSpectator: boolean;
};

// This modal is shown when the user joins a game and doesn't have a display name
export function JoinGameModal({ isOpen, onClose }: JoinGameModalProps) {
  const { game, sendRequest } = useGame()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //const gameId = game.id
    //const name = data.displayName
    //const isSpectator = data.isSpectator

    // Update display name in auth
    //await updateDisplayName({ name })

    // Create player in db
    //await createPlayer({ gameId, isSpectator })

    sendRequest("userevent", data)

    // sendJsonMessage({
    //   type: "userevent",
    //   userId,
    //   name: displayName,
    //   isSpectator: isSpectator,
    //   points: user.points,
    //   gameId,
    // });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to PointIt 👋</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <FormControl isInvalid={!!errors.displayName}>
            <ModalBody>
              <FormLabel htmlFor="name" hidden={true}>
                Display name
              </FormLabel>
              <Input
                id="display-name"
                size="lg"
                placeholder="Enter your name"
                {...register("displayName", {
                  required: "Please enter your name",
                })}
              />
              <FormErrorMessage>
                {errors.displayName && errors.displayName.message}
              </FormErrorMessage>
              <HStack mt={4}>
                <FormLabel htmlFor="join-as-spectator" mb="0">
                  Join as spectator?
                </FormLabel>
                <Switch
                  id="join-as-spectator"
                  colorScheme="green"
                  {...register("isSpectator")}
                />
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                isLoading={isSubmitting}
                type="submit"
              >
                Let&apos;s go!
              </Button>
            </ModalFooter>
          </FormControl>
        </form>
      </ModalContent>
    </Modal>
  );
}

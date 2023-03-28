import { useEffect, useContext } from "react";
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
import { WS_URL } from "../../../../hooks/socketConfig";
import useWebSocket from "react-use-websocket";
import { AuthContext } from "../../../../context/authContext";
import { useRouter } from "next/router";

//import { createPlayer } from 'src/modules/games/mutations'

//import { useGame, useMe } from 'src/modules/games/queries'
//import { updateDisplayName } from '../../mutations/updateDisplayName'

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
  // const { game } = useGame()
  // const { me } = useMe()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const router = useRouter();
  const { id: gameId } = router.query;
  let { token: userId, user, isLoggedIn } = useContext(AuthContext);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: true,
      filter: () => true,
    }
  );

  //   useEffect(() => {
  //     if (lastJsonMessage !== null) {
  //       if (typeof lastJsonMessage === "object") {
  //         const storedData = JSON.parse(JSON.stringify(lastJsonMessage));
  //         if (storedData.type === "annonuymsuser" && storedData.data.user) {
  //         }
  //       }
  //     }
  //   }, [lastJsonMessage]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //const gameId = game.id
    //const name = data.displayName
    //const isSpectator = data.isSpectator

    // Update display name in auth
    //await updateDisplayName({ name })

    // Create player in db
    //await createPlayer({ gameId, isSpectator })

    const { displayName, isSpectator } = data;

    sendJsonMessage({
      type: "userevent",
      userId,
      name: displayName,
      isSpectator: isSpectator,
      points: user.points,
      gameId,
    });

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

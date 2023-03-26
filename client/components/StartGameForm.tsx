import { useContext } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../context/authContext";
//import { createGame } from 'src/modules/home/mutations'
import { WS_URL } from "../hooks/socketConfig";
import useWebSocket from "react-use-websocket";

type Inputs = {
  gameName: string;
};

export const StartGameForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  let { game, token: ownerUserID } = useContext(AuthContext);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: true,
      filter: () => false,
    }
  );

  const getUniqueID = () => {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + "-" + s4();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const gameId = getUniqueID();
    const gameName = data.gameName;
    game = {
      gameId,
      gameName,
    };
    sendJsonMessage({
      type: "gameevent",
      gameId,
      gameName,
      ownerUserID,
    });
    router.push(`/game/${gameId}`);
  };

  return (
    <Box w="container.md">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <FormControl isInvalid={!!errors.gameName}>
          <FormLabel htmlFor="name" hidden={true}>
            First name
          </FormLabel>
          <Input
            id="game-name"
            width="full"
            size="lg"
            placeholder="Enter your game's name here..."
            {...register("gameName", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.gameName && errors.gameName.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          colorScheme="green"
          isLoading={isSubmitting}
          type="submit"
          width="full"
          size="lg"
        >
          Start game
        </Button>
      </form>
    </Box>
  );
};

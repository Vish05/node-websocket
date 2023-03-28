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
import { useGame } from "../hooks/useGame";

type Inputs = {
  gameName: string;
};

export const StartGameForm = () => {
  const router = useRouter();
  const { sendRequest } = useGame();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const getUniqueID = () => {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + "-" + s4();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const gameId = getUniqueID();
    const { gameName } = data;

    //sendRequest("createGame");

    // sendJsonMessage({
    //   type: "gameevent",
    //   gameId,
    //   gameName,
    //   ownerUserID,
    // });
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

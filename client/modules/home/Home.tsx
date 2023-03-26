import { useEffect, useContext } from "react";
import { ColorModeButton } from "../../components/ColorModeButton";
import { Logo } from "../../components/Logo";
import { PlayingCardsDisplay } from "../../components/PlayingCardsDisplay";
import { StartGameForm } from "../../components/StartGameForm";
import {
  Box,
  Heading,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { WS_URL } from "../../hooks/socketConfig";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { AuthContext } from "../../context/authContext";

interface responseMessage {
  type: string;
  data: {
    id: string;
    date: string;
  };
}

export const Home: NextPage = () => {
  const backgroundColor = useColorModeValue("#FAFEFA", "#171923");
  const { login, isLoggedIn, token } = useContext(AuthContext);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      share: false,
      filter: () => true,
      retryOnError: false,
      shouldReconnect: () => false,
    }
  );
  useEffect(() => {
    if (readyState === ReadyState.OPEN && !isLoggedIn) {
      sendJsonMessage({
        type: "annonuymsuser",
      });
    }
  }, [readyState, sendJsonMessage]);

  console.log("39 =>", lastJsonMessage);
  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (typeof lastJsonMessage === "object") {
        //console.log(Object.values(response?.data))
        const storedData = JSON.parse(JSON.stringify(lastJsonMessage));
        if (storedData.type === "annonuymsuser" && storedData.data.id) {
          login(storedData.data.id);
        }
      }
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    console.log("token", token);
  }, [token]);

  return (
    <Box backgroundColor={backgroundColor} h="100vh" overflow="clip">
      <HStack w="full" py="8" px="75" justify="space-between">
        <Logo />
        <ColorModeButton />
      </HStack>
      <Stack align="center">
        <Stack align="center" w="container.lg" my={24}>
          <Heading mb={20} size="4xl" textAlign={"center"}>
            Who said you can’t play card games at work?
          </Heading>
          <StartGameForm />
        </Stack>
        <PlayingCardsDisplay />
      </Stack>
    </Box>
  );
};

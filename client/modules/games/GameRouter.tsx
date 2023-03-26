import { useState, useContext } from "react";
import { Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";

//import { useGame } from './queries'

import { Game } from "./Game";
import { createPlayer } from "./mutations/createPlayer";
import { JoinGameModal } from "../players/components/JoinGameModal";
import { AuthContext } from "../../context/authContext";
import useWebSocket from "react-use-websocket";
import { WS_URL } from "../../hooks/socketConfig";
import { useRouter } from "next/router";

export const GameRouter: NextPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const user = {
  //     "uid": "123",
  //     displayName: ""
  //   };
  const { token: userId, setUserData, user } = useContext(AuthContext);
  const [game, setGame] = useState<any>(null);
  const router = useRouter();
  const { id: gameId } = router.query;
  //const { players, game, isLoading, error } = useGame()
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: !user?.name,
  });

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: true,
      filter: () => true,
    }
  );
  console.log("38 =>", lastJsonMessage, readyState);
  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (typeof lastJsonMessage === "object") {
        const storedData = JSON.parse(JSON.stringify(lastJsonMessage));
        if (storedData.type === "nameUpdate" && storedData.data.user) {
          const user = storedData.data.user;
          setUserData({
            name: user.name,
          });
        }
        if (storedData.type === "gameUpdate" && storedData.data.game) {
          setGame(storedData.data.game);
        }
      }
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    sendJsonMessage({
      type: "getGameUpdate",
      gameId,
    });
  }, []);

  // useEffect(() => {
  //   // async function checkAndJoinGame() {
  //   //   const isUserAlreadyInGame = players?.find((player) => player.userId === user?.uid)
  //   //   const hasDisplayName = user?.displayName

  //   //   if (players && hasDisplayName && !isUserAlreadyInGame) {
  //   //     await createPlayer({ gameId: game.id })
  //   //   }
  //   // }
  //   // checkAndJoinGame()
  // }, [game.id, user, players])

  // if (isLoading) {
  //   return <Spinner />
  // }

  // if (error) {
  //   return <Text>Error</Text>
  // }
  if (!user?.name) {
    return <JoinGameModal isOpen={isOpen} onClose={onClose} />;
  }

  return <Game game={game} />;
};

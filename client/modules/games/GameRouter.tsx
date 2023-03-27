import { useState, useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { Game } from "./Game";
import { createPlayer } from "./mutations/createPlayer";
import { JoinGameModal } from "../players/components/JoinGameModal";
import { AuthContext } from "../../context/authContext";
import useWebSocket from "react-use-websocket";
import { WS_URL } from "../../hooks/socketConfig";
import { useRouter } from "next/router";

export const GameRouter: NextPage = () => {
  const { token: userId, setUserData, user } = useContext(AuthContext);
  const [game, setGame] = useState<any>(null);
  const router = useRouter();
  const { id: gameId } = router.query;
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: !user?.name,
  });

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
    filter: () => true,
  });

  console.log("38 =>", lastJsonMessage);
  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (typeof lastJsonMessage === "object") {
        const storedData = JSON.parse(JSON.stringify(lastJsonMessage));
        // if (storedData.type === "nameUpdate" && storedData.data.user) {
        //   const responseData = storedData.data.user;
        //   setUserData(responseData);
        // }
        if (storedData.type === "gameUpdate" && storedData.data.game) {
          setGame(storedData.data.game);
          const responseData = storedData.data.user;
          setUserData(responseData);
          console.log(storedData)
        }
      }
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    sendJsonMessage({
      type: "getGameUpdate",
      gameId,
    });
  }, [sendJsonMessage]);

  if (!user?.name) {
    return <JoinGameModal isOpen={isOpen} onClose={onClose} />;
  }
  console.log(game);
  return <Game game={game} />;
};

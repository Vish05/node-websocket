import { useState, useContext } from "react";
import { useDisclosure, Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { Game } from "./Game";
import { createPlayer } from "./mutations/createPlayer";
import { JoinGameModal } from "../players/components/JoinGameModal";
import { useGame } from "../../hooks/useGame";

export const GameRouter: NextPage = () => {
  const { user, game, sendRequest } = useGame();
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: !user?.name,
  });

  console.log("after _id", game);

  useEffect(() => {
    function checkAndJoinGame() {
      const players = game?.players;
      const isUserAlreadyInGame = players?.includes(user?.id)
      const hasDisplayName = user?.name;
      if (players && hasDisplayName && !isUserAlreadyInGame) {
        //createPlayer({ gameId: game.gameId })
        //console.log("insdie checkAndJoinGame");
        //sendRequest("createPlayer", "get")
        console.log("user not in current game =>", user.id)
      }
    }
    checkAndJoinGame()
  }, [user])


  // const [game, setGame] = useState<any>(null);
  // const router = useRouter();
  // const { id: gameId } = router.query;
  // const { isOpen, onClose } = useDisclosure({
  //   defaultIsOpen: !user?.name,
  // });

  // const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
  //   WS_URL,
  //   {
  //     share: true,
  //     filter: () => true,
  //   }
  // );

  // console.log("38 =>", lastJsonMessage);
  // useEffect(() => {
  //   if (lastJsonMessage !== null) {
  //     if (typeof lastJsonMessage === "object") {
  //       const storedData = JSON.parse(JSON.stringify(lastJsonMessage));
  //       // if (storedData.type === "nameUpdate" && storedData.data.user) {
  //       //   const responseData = storedData.data.user;
  //       //   setUserData(responseData);
  //       // }
  //       if (storedData.type === "gameUpdate" && storedData.data.game) {
  //         setGame(storedData.data.game);
  //         const responseData = storedData.data.user;
  //         setUserData(responseData);
  //         console.log(storedData);
  //       }
  //     }
  //   }
  // }, [lastJsonMessage]);

  // useEffect(() => {
  //   sendJsonMessage({
  //     type: "getGameUpdate",
  //     gameId,
  //   });
  // }, []);
  //console.log("join game condition", !user?.name, user)
  if (!user?.name) {
    return <JoinGameModal isOpen={isOpen} onClose={onClose} />;
  }
  return <Game />;
};

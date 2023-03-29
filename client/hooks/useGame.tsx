import { useEffect, useContext, useState } from "react";
import { WS_URL } from "./socketConfig";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export const useGame = () => {
  const {
    login,
    isLoggedIn,
    token,
    setUserData,
    user,
    setGameData,
    game,
    players,
    setPlayersData,
  } = useContext(AuthContext);
  const router = useRouter();
  const { id: gameId } = router.query;
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    queryParams: {
      id: token ?? "",
      gameId: gameId?.toString() ?? "",
    },
    share: true,
    filter: () => true,
    retryOnError: false,
    shouldReconnect: () => false,
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (typeof lastJsonMessage === "object") {
        const storedData = JSON.parse(JSON.stringify(lastJsonMessage));
        //console.log(storedData);
        if (storedData.type === "annonuymsuser" && storedData.data.user) {
          if (!isLoggedIn) {
            const { id } = storedData.data.user;
            login(id);
            console.log("setUserData called", storedData.data.user);
            setUserData(storedData.data.user);
          }
        }
        if (storedData.type === "gameevent" && storedData.data.game) {
          console.log("inside gameevent", storedData.data.game);
          const { gameId, gameName, owenerId, revealed, players } =
            storedData.data.game;
          setGameData({
            gameId: gameId,
            gameName: gameName,
            owenerId: owenerId,
            revealed: revealed,
            players: players,
          });
        }
        if (storedData.type === "nameUpdate" && storedData.data.user) {
          console.log("inside nameUpdate");
          const responseData = storedData.data.user;
          setPlayersData(responseData);
          console.log("setUserData called", storedData.data.user);
          setUserData({
            id: user.id,
            name: storedData.data.user.name,
            isSpectator: storedData.data.user.isSpectator,
            points: storedData.data.user.points,
          });
        }
        if (storedData.type === "gameUpdate" && storedData.data.game) {
          setGameData(storedData.data.game);
        }
      }
    }
  }, [lastJsonMessage]);

  const sendRequest = (type: string, data: any) => {
    switch (type) {
      case "createGame":
        const gameId = uuidv4();
        const gameName = data;
        sendJsonMessage({
          type: "gameevent",
          gameId,
          gameName,
          ownerUserID: user.id,
        });
        setGameData({
          ...game,
          gameId: gameId,
          gameName: gameName,
        });
        return gameId;
      case "userevent":
        sendJsonMessage({
          type: "userevent",
          userId: token,
          name: data.displayName,
          isSpectator: data.isSpectator,
          points: 0,
          gameId: game.gameId,
        });
        return "";
      default:
        console.log("Unknwon switch param: ");
    }
  };

  return {
    token: user.id,
    login,
    user,
    sendRequest,
    game,
    players,
  };
};

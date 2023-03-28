import { useEffect, useContext } from "react";
import { WS_URL } from "./socketConfig";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { AuthContext } from "../context/authContext";

export const useGame = () => {
  const { login, logout, token, setUserData, user } = useContext(AuthContext);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    queryParams: { id: token || "" },
    share: true,
    filter: () => true,
    retryOnError: false,
    shouldReconnect: () => false,
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (typeof lastJsonMessage === "object") {
        const storedData = JSON.parse(JSON.stringify(lastJsonMessage));
        if (storedData.type === "annonuymsuser" && storedData.data.user) {
          const { id, isSpectator, name, points } = storedData.data.user;
          login(id);
          const newUser = {
            id,
            isSpectator,
            name,
            points,
          };
          setUserData(newUser);
        }
      }
    }
  }, [lastJsonMessage]);

  const sendRequest = (type: string) => {
    switch (type) {
      case "createGame":
        sendJsonMessage({
          type: "gameevent",
        });
        return console.log("createGame");
      default:
        console.log("Unknwon switch param: ");
    }
  };

  return {
    token: user.id,
    login,
    logout,
    user,
    isLoggedIn: !!user.id,
    sendRequest,
  };
};

import { useState, useEffect, useCallback } from "react";
import { IGame, IUser } from "../context/authContext.type";

const initalStateUser = {
  id: "",
  name: "",
  isSpectator: false,
  points: 0,
};

const initalStateGame = {
  gameId: "",
  gameName: "",
  owenerId: "",
  revealed: false,
  players: []
};

export const useAuth = () => {
  const [user, setUser] = useState<IUser>(initalStateUser);
  const [game, setGame] = useState<IGame>(initalStateGame);
  const [players, setPlayers] = useState<IUser[]>();

  const login = useCallback((token: string) => {
    const userData = {
      id: token,
      name: "",
      isSpectator: false,
      points: 0,
    };
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(initalStateUser);
    localStorage.removeItem("userData");
  }, []);

  const setUserData = useCallback(
    (data: IUser) => {
      const userData = {
        ...user,
        ...data,
      };
      setUser(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    [user]
  );

  const setGameData = useCallback(
    (data: IGame) => {
      const gameData = {
        ...game,
        ...data,
      };
      setGame(gameData);
    },
    [game]
  );

  const setPlayersData = useCallback(
    (data: IUser) => {
      console.log("setPlayerData called");
      let playersData;
      if (players) {
        playersData = [...players, data]
      } else {
        playersData = [data];
      }
      setPlayers(playersData);
    },
    [players]
  );

  useEffect(() => {
    const value = localStorage.getItem("userData");
    if (typeof value === "string") {
      const storedData = JSON.parse(value);
      if (storedData) {
        setUser(storedData);
      }
    }
  }, [setUser]);

  return {
    token: user.id,
    login,
    logout,
    setUserData,
    setGameData,
    setPlayersData,
    game,
    user,
    players,
    isLoggedIn: !!user.id,
  };
};

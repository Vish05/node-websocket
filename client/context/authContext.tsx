import { createContext } from "react";
import { AuthContextType, IUser } from "./authContext.type";

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  user: {
    id: "",
    name: "",
    isSpectator: false,
    points: 0
  },
  game: {
    gameId: "",
    gameName: "",
    owenerId: "",
    revealed: false,
    players: [],
  },
  players: [{
    id: "",
    name: "",
    isSpectator: false,
    points: 0
  }],
  login: () => { },
  logout: () => { },
  setUserData: () => { },
  setGameData: () => { },
  setPlayersData: () => { }
});

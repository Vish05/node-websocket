import { createContext } from "react";
import { AuthContextType } from "./authContext.type";

export const AuthContext = createContext<any>({
  isLoggedIn: false,
  token: null,
  game: {
    gameId: "",
    gameName: "",
  },
  user: {},
  login: () => {},
  logout: () => {},
});

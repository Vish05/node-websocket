import { createContext } from "react";
import { AuthContextType } from "./authContext.type";

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  user: {
    id: "",
    name: "",
    isSpectator: false,
  },
  login: () => {},
  logout: () => {},
});

export interface IUser {
  id: string;
  name: string;
  isSpectator: boolean;
  points: number;
}

export interface IGame {
  gameId: string;
  gameName: string;
  owenerId: string;
  revealed: boolean;
}

export type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  user: IUser;
  login: (token: string) => void;
  logout: () => void;
  setUserData: (data: IUser) => void;
};

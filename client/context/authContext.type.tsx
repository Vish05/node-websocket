export interface IGame {
  gameId: string;
  gameName: string;
}

export type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  game: IGame;
  login: (token: string) => void;
  logout: () => void;
};

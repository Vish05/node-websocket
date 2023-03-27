export interface IUser {
  id: string;
  name: string;
  isSpectator: boolean;
}

export type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  user: IUser;
  login: (token: string) => void;
  logout: () => void;
};

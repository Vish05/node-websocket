export interface IUser {
  id: string;
  name: string;
  isSpectator: boolean;
  points: number
}

export type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  user: IUser;
  login: (token: string) => void;
  logout: () => void;
  setUserData: (data: IUser) => void
};

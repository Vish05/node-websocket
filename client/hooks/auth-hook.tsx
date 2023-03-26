import { useState, useEffect, useCallback } from "react";

const initalState = {
  id: "",
  name: "",
  isSpectator: false,
};

export const useAuth = () => {
  const [user, setUser] = useState<any>(initalState);
  const login = useCallback((token: string) => {
    const userData = {
      id: token,
      name: "",
      isSpectator: false,
    };
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(initalState);
    localStorage.removeItem("userData");
  }, []);

  const setUserData = useCallback(
    (data: any) => {
      const userData = {
        ...user,
        ...data,
      };
      setUser(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    [user]
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

  return { token: user.id, login, logout, setUserData, user };
};

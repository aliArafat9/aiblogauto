"use client";

import { useEffect } from "react";
import { loginOrRegisterAction, authCheckAction, logoutAction } from "@/actions/auth";
import toast from "react-hot-toast";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";

import { UserType } from "@/utils/types";
import { set } from "mongoose";

type AuthContextType = {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loginModalOpen: boolean;
  setLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  handleLoginSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  logout: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: UserType = {
  name: "",
  username: "",
  role: "",
  email: "ryan@gmail.com",
  password: "rrrrrr",
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  //state
  const [user, setUser] = useState<UserType>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async (): Promise<void> => {
    setLoading(true);

    try {
      const res = await authCheckAction();

      if (res.user) {
        setUser(res.user);
      }
      setLoggedIn(res.loggedIn);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginOrRegisterAction(user.email, user.password || "");
      console.log("login response => ", res);

      if (res?.error) {
        toast.error(res.error);
      } else {
        setUser(res.user as UserType); 
        setLoggedIn(true);
        toast.success("Login successful");
        setLoginModalOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
      setLoginModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try{
      await logoutAction();
      setLoggedIn(false);
      setUser(initialState);
      toast.success("Logout successful");
    } catch (error) {
      console.error(error);
      toast.error("Logotut failed, please try again later");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        loginModalOpen,
        setLoginModalOpen,
        handleLoginSubmit,
        loggedIn,
        setLoggedIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

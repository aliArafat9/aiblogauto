"use client";
import { useEffect } from "react";
import {
  loginOrRegisterAction,
  authCheckAction,
  logoutAction,
} from "@/actions/auth";
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
  // state
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

      if (res?.error) {
        toast.error(res.error);
      } else {
        setUser(res.user as UserType);
        setLoggedIn(true);
        toast.success("Logged in successfully");
        setLoginModalOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setLoginModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutAction();
      setLoggedIn(false);
      setUser(initialState);
      toast.success("Logged out successfully");
    } catch (err) {
      console.log(err);
      toast.error("Logout failed. Please try again.");
    }
  };

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

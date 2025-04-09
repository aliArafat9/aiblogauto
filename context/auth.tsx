"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";

type UserType = {
    name: string;
    username: string;
    role: string;
    email: string;
    password: string;
};

type AuthContextType = {
    user: UserType,
    setUser: Dispatch<SetStateAction<UserType>>
    loading: boolean,
    setLoadng: Dispatch<SetStateAction<Boolean>>
    loginModalOpen: boolean,
    setLoginModalOpen: Dispatch<SetStateAction<Boolean>>
    handleLoginSubmit: (e: FormEvent<HTMLFormElement>) => void
    
}
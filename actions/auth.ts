"use server";
import validate from "deep-email-validator";
import db from "@/utils/db";
import User from "@/models/user";
import { hashPassword, comparePassword } from "@/utils/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { UserType, AuthResponseType } from "@/utils/types";

interface LogoutResponse {
  message: string;
}

// auth check
export const authCheckAction = async (): Promise<{
  user?: UserType;
  loggedIn: boolean;
}> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth")?.value;

  if (!token) {
    return { loggedIn: false };
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserType;
    return { user: decoded, loggedIn: true };
  } catch (error) {
    return { loggedIn: false };
  }
};

// helper function to generate JWT token
const generateToken = (payload: UserType): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

// helper function to set HTTP only cookie
const setAuthCookie = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
};

export const loginOrRegisterAction = async (
  email: string,
  password: string
) => {
  // let { valid } = await validate({ email });

  // if (!valid) {
  //   return { error: "Invalid email. Please provide valid email address." };
  // }
  const isEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  if (!isEmail(email)) {
    return { error: "Please provide a valid email address." };
  }

  

  if (!password || password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  await db();

  let user = await User.findOne({ email });

  if (user) {
    // login
    const match = await comparePassword(password, user.password);
    if (!match) {
      return { error: "Incorrect password" };
    }
  } else {
    // register
    user = new User({
      email,
      password: await hashPassword(password),
      name: email.split("@")[0],
      username: nanoid(6),
    });

    await user.save();
  }

  // send user with token
  const { _id, name, username, role } = user;
  const token = generateToken({ _id, name, username, role, email });

  await setAuthCookie(token);

  return {
    user: { name, username, role, email },
    loggedIn: true,
  };
};

export async function logoutAction(): Promise<LogoutResponse> {
  const cookieStore = await cookies();

  const hasCookie = cookieStore.has("auth");

  if (hasCookie) {
    cookieStore.delete("auth");

    return { message: "Logged out successfully" };
  } else {
    return { message: "No active session found" };
  }
}

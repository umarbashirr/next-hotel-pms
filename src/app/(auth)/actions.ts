"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const loginUser = async (email: string, password: string) => {
  console.log("loginUser", email, password);

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/properties",
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "An error occurred while signing in" };
      }
    }
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const logout = await signOut({ redirectTo: "/login" });

    if (!logout) throw new Error("An error occurred while signing out");

    return { success: true, message: "Successfully signed out" };
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "An error occurred while signing in" };
      }
    }
    throw error;
  }
};

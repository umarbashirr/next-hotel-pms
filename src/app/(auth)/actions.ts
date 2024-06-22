import { signIn } from "@/auth";

export const loginUser = async (email: string, password: string) => {
  const data = await signIn("credentials", {
    email: email,
    password: password,
  });
  return data;
};

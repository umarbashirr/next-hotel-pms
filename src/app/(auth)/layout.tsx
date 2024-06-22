import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  console.log(session);

  return <div>{children}</div>;
};

export default AuthLayout;

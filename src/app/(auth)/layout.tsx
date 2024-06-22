import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) {
    redirect("/properties");
  }

  return <div>{children}</div>;
};

export default AuthLayout;

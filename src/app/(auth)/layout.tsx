import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const token = cookies().get("token")?.value;

  if (token) {
    redirect("/properties");
  }

  return <div>{children}</div>;
};

export default AuthLayout;

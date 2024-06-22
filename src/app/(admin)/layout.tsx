import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const GlobalAdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <div>{children}</div>;
};

export default GlobalAdminLayout;

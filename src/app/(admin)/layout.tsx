import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const GlobalAdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return <div>{children}</div>;
};

export default GlobalAdminLayout;

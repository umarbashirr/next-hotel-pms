import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

const SinglePropertyLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  return (
    <div>
      <Sidebar propertyId={params?.id} />
      <div className="pl-72">
        <Header propertyId={params?.id} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default SinglePropertyLayout;

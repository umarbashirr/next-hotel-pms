import { redirect } from "next/navigation";

const SinglePropertyPage = ({ params }: { params: { id: string } }) => {
  redirect(`/properties/${params.id}/guest-movement`);
};

export default SinglePropertyPage;

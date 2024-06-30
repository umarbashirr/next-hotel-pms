"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileForm from "../_components/ProfileForm";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Individual Profile</CardTitle>
          <CardDescription>
            This is a form to create an individual profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm propertyId={params?.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

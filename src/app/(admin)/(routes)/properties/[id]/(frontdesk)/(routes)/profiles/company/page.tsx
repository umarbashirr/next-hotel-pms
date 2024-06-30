"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CompanyProfileForm from "../_components/CompanyProfileForm";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Company Profile</CardTitle>
          <CardDescription>
            This is a form to create a company profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyProfileForm propertyId={params?.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

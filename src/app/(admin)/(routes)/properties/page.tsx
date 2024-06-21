"use client";

import { Card } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/v1/hotels/all", {
        withCredentials: true,
      });

      const result = response.data;

      if (!result.success) {
        throw new Error(result.message);
      }
      setProperties(result.data);
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property: any) => (
        <Link
          key={property?.hotel.id}
          href={`/properties/${property?.hotel.id}`}
        >
          <Card className="p-4">
            <div className="relative w-full min-h-[250px]">
              <Image
                src={property?.hotel?.image || "/images/hotel-image.jpg"}
                fill
                alt="Hotel Image"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 px-2">
              <h3 className="font-semibold">{property?.hotel?.name}</h3>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PropertiesPage;

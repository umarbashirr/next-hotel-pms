"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AccessForm from "../_components/AccessForm";
import AddNewUser from "../_components/AddNewUser";
import { fetchUsersForProperty } from "./actions";

const UsersListPage = ({ params }: { params: { id: string } }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any>([]);

  const editHandler = (user: any) => {
    setIsEditing(true);
    setSelectedUser(user);
  };

  const fetchUsers = async () => {
    fetchUsersForProperty(params.id)
      .then((res) => {
        setUsers(res.data);
        console.log(res.message);
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-end justify-between">
            <div>
              <CardTitle className="text-xl">Users List</CardTitle>
              <CardDescription>
                Here you can manage all your users for current property
              </CardDescription>
            </div>
            <AddNewUser propertyId={params?.id} />
          </div>
        </CardHeader>
        <CardContent className=" overflow-auto">
          <table className="border w-full">
            <thead className="border">
              <tr className="border">
                <th className="border px-4 py-3 text-start ">S.No</th>
                <th className="border px-4 py-3 text-start">Name</th>
                <th className="border px-4 py-3 text-start">Email</th>
                <th className="border px-4 py-3 text-start">Access</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any, idx: number) => {
                return (
                  <tr className="border" key={idx}>
                    <td className="border px-4 py-2 text-start">{idx + 1}</td>
                    <td className="border px-4 py-2 text-start whitespace-nowrap">
                      {user?.user?.name}
                    </td>
                    <td className="border px-4 py-2 text-start">
                      {user?.user?.email}
                    </td>
                    <td className="border px-4 py-2 text-start">
                      {user?.role}
                    </td>
                    <td className="px-4 py-2 flex items-center justify-center">
                      <Button size="sm" onClick={() => editHandler(user)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
      {isEditing && (
        <Modal
          title="Edit User"
          open={isEditing}
          description="Fill the form to edit user details"
          setOpen={() => setIsEditing(false)}
        >
          <AccessForm
            isEditing={isEditing}
            user={selectedUser}
            propertyId={params.id}
            closeModal={setIsEditing}
          />
        </Modal>
      )}
    </div>
  );
};

export default UsersListPage;

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateUserForm from "@/components/user/createForm";
import { getUsers } from "@/lib/api/users/queries";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const formId = "create-user-form";
  const router = useRouter();

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    },
  });

  if (status === "loading") {
    router.push("/");
    return (
      <div className="flex justify-center items-center mt-20">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-1/2 w-full mt-20">
      <div className="flex flex-col h-full w-1/2">
        <h1>User Actions</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create New User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create User</DialogTitle>
            </DialogHeader>
            <CreateUserForm formId={formId} setOpen={setOpen} />
            <DialogFooter>
              <Button type="submit" form={formId}>
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-10">
        <Table>
          <TableCaption>LinkHive Users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Link Count</TableHead>
              <TableHead>Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) =>
              user.name === "admin" ? null : (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.admin ? "Yes" : "No"}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

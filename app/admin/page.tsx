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
import CreateUserForm from "@/components/user/createForm";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const formId = "create-user-form";
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
    window.location.replace("/");
    return "loading";
  }

  return (
    <div className="flex justify-center h-1/2 w-full">
      <div className="flex flex-col justify-center h-full w-1/2">
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
    </div>
  );
}

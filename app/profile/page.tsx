"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PasswordInput from "@/components/ui/password-input";
import { updatePassword } from "@/lib/api/users/mutations";

const formSchema = z
  .object({
    currentPassword: z.string().nonempty(),
    newPassword: z.string().nonempty(),
    confNewPassword: z.string().nonempty(),
  })
  .refine((data) => data.newPassword === data.confNewPassword, {
    message: "Passwords do not match",
    path: ["confNewPassword"],
  });

export default function Page() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    handleOpenChange();

    toast({
      title: `You updated your password`,
    });

    updatePassword(data.currentPassword, data.newPassword);
  }

  function handleOpenChange() {
    if (open) {
      setOpen(false);
      form.reset();
    } else {
      setOpen(true);
    }
  }

  // If the status is unauthenticated, redirect them to the login page
  if (status === "unauthenticated") {
    return (
      <div className="flex w-full justify-center">
        <p>You are not signed in.</p>
      </div>
    );
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center bg-background">
      <div className="pt-20">
        <h1 className="text-xl">Profile</h1>
        <h1 className="text-text">Username: {session?.user?.name}</h1>
        <div className="border border-secondary p-2 rounded-lg mt-5">
          <h1>User Actions</h1>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button size="sm">Change Password</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Change Password</DialogTitle>
              <Form {...form}>
                <form
                  id="change-password-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <PasswordInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <PasswordInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <PasswordInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <DialogFooter>
                <Button form="change-password-form">Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}

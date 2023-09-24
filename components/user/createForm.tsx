"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { createLink, createUser, updateLink } from "@/lib/api/links/mutations";
import { useRouter } from "next/navigation";
import { Link } from "@prisma/client";
import { encryptPassword } from "@/app/services/users";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  admin: z.boolean(),
});

export default function CreateUserForm({
  setOpen,
  formId,
}: {
  link?: Link;
  setOpen: any;
  formId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      admin: false,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    createUser({
      user: {
        name: data.username,
        password: data.password,
        admin: data.admin,
      },
    });
    toast({
      title: `You created user '${data.username}'`,
    });
    router.refresh();
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="jsmith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="admin"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col">
                <FormLabel>Admin</FormLabel>
                <FormControl>
                  <Switch
                    className="mt-3"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

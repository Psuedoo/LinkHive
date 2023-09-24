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
import { updateLink } from "@/lib/api/links/mutations";
import { useRouter } from "next/navigation";
import { Link } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  url: z.string().min(2).max(50).url(),
  authRequired: z.boolean(),
});

export default function EditLinkForm({
  link,
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
      title: link?.title,
      url: link?.url,
      authRequired: link?.authRequired === false ? false : true,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setOpen(false);

    if (!link) return;
    updateLink({
      link: {
        id: link.id,
        title: data.title,
        url: data.url,
        authRequired: data.authRequired,
      },
    });
    toast({
      title: `You updated '${data.title}'`,
    });
    router.refresh();
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Google" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://google.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authRequired"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col">
                <FormLabel>Private</FormLabel>
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

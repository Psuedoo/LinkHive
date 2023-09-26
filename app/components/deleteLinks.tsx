"use client";

import { useRouter } from "next/navigation";
import { Link } from "@prisma/client";
import { deleteLink } from "@/lib/api/links/mutations";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

export default function DeleteLinkConfirmationDialog({ link }: { link: Link }) {
  const router = useRouter();
  const { toast } = useToast();
  const handleSubmit = () => {
    deleteLink(link.id);
    toast({
      title: `You deleted '${link.title}'`,
    });
    router.refresh();
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently this link.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

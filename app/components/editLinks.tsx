"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditLinkForm from "@/components/link/editForm";
import { Link } from "@prisma/client";

export function EditLinkDialogContent({
  link,
  setOpen,
}: {
  link: Link;
  setOpen: any;
}) {
  const formId = "edit-link-form";
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Link</DialogTitle>
      </DialogHeader>
      <EditLinkForm link={link} formId={formId} setOpen={setOpen} />
      <DialogFooter>
        <Button type="submit" form={formId}>
          Edit Link
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

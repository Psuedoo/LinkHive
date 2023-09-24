"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import CreateLinkForm from "@/components/link/createForm";

export function CreateLinkButton() {
  const formId = "create-link-form";
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Link</DialogTitle>
          </DialogHeader>
          <CreateLinkForm formId={formId} open={open} setOpen={setOpen} />
          <DialogFooter>
            {/* TODO: Change this to floating button */}
            <Button type="submit" form={formId}>
              Create Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

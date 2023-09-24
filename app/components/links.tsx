"use client";

import { useState } from "react";
import { default as NextLink } from "next/link";
import { EditLinkDialogContent } from "./editLinks";
import DeleteLinkConfirmationDialog from "./deleteLinks";
import { Link } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

function Link({ link }: { link: Link }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <AlertDialog>
          <ContextMenu>
            <ContextMenuTrigger>
              <Button
                className="transition duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                asChild
              >
                <NextLink href={link.url}>{link.title}</NextLink>
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <DialogTrigger asChild>
                <ContextMenuItem>Edit</ContextMenuItem>
              </DialogTrigger>
              <AlertDialogTrigger asChild>
                <ContextMenuItem>Delete</ContextMenuItem>
              </AlertDialogTrigger>
            </ContextMenuContent>
          </ContextMenu>
          <EditLinkDialogContent setOpen={setOpen} link={link} />
          <DeleteLinkConfirmationDialog link={link} />
        </AlertDialog>
      </Dialog>
    </>
  );
}

export function LinksGrid({ links }: { links: Link[] }) {
  const linkComponents = links.map((link) => (
    <Link key={link.id} link={link} />
  ));

  return <div className="flex">{linkComponents}</div>;
}

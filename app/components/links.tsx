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
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

function Link({ link }: { link: Link }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <AlertDialog>
          <ContextMenu>
            <ContextMenuTrigger>
              <Button
                className="break-all text-ellipsis overflow-hidden transition duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-110 m-2"
                asChild
              >
                <NextLink href={link.url}>
                  <p>{link.title}</p>
                </NextLink>
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

  return (
    <>
      <div className="relative mt-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground uppercase">
            links
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">{linkComponents}</div>
    </>
  );
}

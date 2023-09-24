"use client";

import { DeleteFilled } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import { useRouter } from "next/navigation";
import { Link } from "@prisma/client";
import { deleteLink } from "@/lib/api/links/mutations";

export function DeleteLinkContextItem({ link }: { link: Link }) {
  const router = useRouter();
  const confirm = () => {
    deleteLink(link.id);
    message.success("Link deleted");
    router.refresh();
  };

  const cancel = () => {
    message.error("Canceled");
  };

  return (
    <Popconfirm
      title="Delete the link"
      description="Are you sure you want to delete this link?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      placement="bottom"
    >
      <DeleteFilled /> Delete
    </Popconfirm>
  );
}

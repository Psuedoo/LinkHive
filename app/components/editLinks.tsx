"use client";

import { useEffect, useState } from "react";
import { Modal } from "antd";
import { EditFilled } from "@ant-design/icons";
import { LinkForm } from "./links";
import { useRouter } from "next/navigation";
import { updateLink } from "@/lib/api/links/mutations";

export function EditLinkContextItem(props: any) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const EditLinkForm = () => {
    const onFinish = (values: any) => {
      const id = props.id as string;
      const title = values.title as string;
      const url = values.url as string;
      let authRequired = values.authRequired as boolean;

      if (authRequired === undefined || authRequired === true) {
        authRequired = true;
      }

      updateLink({ link: { id, title, url, authRequired } });
      setIsModalOpen(false);
      router.refresh();
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    return (
      <LinkForm
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        link={{
          url: props.url,
          title: props.title,
          authRequired: props.authRequired,
        }}
      />
    );
  };

  const EditLinkModalContent = (props: any) => {
    return (
      <Modal
        title="Edit Link"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[null]}
      >
        <EditLinkForm {...props} />
      </Modal>
    );
  };
  return (
    <>
      <EditLinkModalContent />
      <div onClick={showModal}>
        <EditFilled /> Edit
      </div>
    </>
  );
}

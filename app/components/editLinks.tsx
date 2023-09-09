"use client";

import { useEffect, useState } from "react";
import { Modal } from "antd";
import { EditFilled } from "@ant-design/icons";
import { LinkForm } from "./links";
import { useSession } from "next-auth/react";
import { updateLink } from "../services/link";

export function EditLinkContextItem(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const EditLinkForm = () => {
    const onFinish = (values: any) => {
      const id = props.id;
      const title = values.title;
      const url = values.url;
      let authRequired = values.authRequired;

      if (authRequired === undefined || authRequired === true) {
        authRequired = true;
      }

      updateLink({ id, title, url, authRequired });
      setIsModalOpen(false);
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

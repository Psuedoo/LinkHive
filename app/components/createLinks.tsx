"use client";

import { useState } from "react";
import { createLink } from "../services/link";
import { FloatButton, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { LinkForm } from "./links";

export function CreateLinkButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const CreateLinkForm = () => {
    const onFinish = (values: any) => {
      const title = values.title;
      const url = values.url;
      let authRequired = values.authRequired;

      if (authRequired === undefined || authRequired === true) {
        authRequired = true;
      }

      createLink({ title, url, authRequired });
      setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    return <LinkForm onFinish={onFinish} onFinishFailed={onFinishFailed} />;
  };

  const LinkModalContent = () => {
    return (
      <Modal
        title="Add Link"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[null]}
      >
        <CreateLinkForm />
      </Modal>
    );
  };

  return (
    <>
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Add link</div>}
        onClick={showModal}
      />
      <LinkModalContent />
    </>
  );
}

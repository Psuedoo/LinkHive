"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { allLinks, createLink } from "../services/link";
import { default as NextLink } from "next/link";
import { Button, FloatButton, Form, Input, Modal, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function Link(LinkProps: any) {
  const [size, setSize] = useState("md");

  return (
    <NextLink href={LinkProps.url}>
      <div
        className="m-2 border-8 rounded-md border-secondary-500 bg-secondary-400 p-10"
        onMouseEnter={() => {
          setSize("lg");
        }}
        onMouseLeave={() => {
          setSize("md");
        }}
      >
        <p className={"text-black text-" + size}>{LinkProps.title}</p>
      </div>
    </NextLink>
  );
}

export function LinksGrid() {
  const [remoteLinks, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    allLinks().then((resp) => {
      setLinks(resp);
      setLoading(false);
    });
  }, [user?.id]);

  const links = remoteLinks.map((link) => <Link key={link.id} {...link} />);

  return (
    <div className="flex flex-row">
      {loading ? <p className="text-black">Loading...</p> : links}
    </div>
  );
}

export function CreateLink() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(open);
  }, [open]);

  const LinkModalContent = () => {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        <div className="flex flex-col h-3/4 w-2/4 bg-white rounded-lg">
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="flex text-black place-self-end m-5"
          >
            X
          </button>
          {/* <CreateLinkForm /> */}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center">
      <div
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer" }}
        className="flex justify-center items-center bg-secondary-400 h-10 w-10 rounded-3xl"
      >
        <p className="text-black">+</p>
      </div>
      {open ? <LinkModalContent /> : <></>}
    </div>
  );
}

export function CreateLinkButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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

    return (
      <Form
        name="link"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Links have to have a title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="URL"
          name="url"
          rules={[{ required: true, message: "Links have to have a URL" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Auth Required" name="authRequired">
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  };

  const LinkModalContent = () => {
    return (
      <Modal
        title="Add Link"
        open={isModalOpen}
        onOk={handleOk}
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

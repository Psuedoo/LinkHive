"use client";

import { Button, Form, FormInstance, Input, Modal, Switch } from "antd";
import { useRef, useState } from "react";
import { EyeFilled, EyeInvisibleOutlined } from "@ant-design/icons";
import { createUser } from "../services/users";
import { encryptPassword } from "../services/users";

export type UserType = {
  id?: string;
  name: string;
  password?: string;
  admin: boolean;
};

export function UserForm(props: any) {
  const formRef = useRef<FormInstance>(null);
  const [passVisible, setPassVisible] = useState(false);
  const [passInputType, setPassInputType] = useState("password");

  // This is used for the editing modal, not implemented yet
  // useEffect(() => {
  //   if (formRef.current && props.user) {
  //     formRef.current?.setFieldsValue({
  //       title: props.link.title,
  //       url: props.link.url,
  //       authRequired: props.link.authRequired,
  //     });
  //   }
  // }, [props, props.link, formRef]);

  const togglePassVisible = () => {
    setPassVisible(!passVisible);
    setPassInputType(passVisible ? "password" : "text");
  };

  const EyeIcon = () => {
    return (
      <>
        {passVisible ? (
          <EyeInvisibleOutlined onClick={togglePassVisible} />
        ) : (
          <EyeFilled onClick={togglePassVisible} />
        )}
      </>
    );
  };

  return (
    <Form
      name="user"
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      layout="vertical"
      ref={formRef}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Users must have a username" }]}
        initialValue={props.username}
      >
        <Input value="test" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Users must has a password" }]}
        initialValue={props.password}
      >
        <Input type={passInputType} addonAfter={<EyeIcon />} />
      </Form.Item>
      <Form.Item label="Admin" name="admin">
        {props.link ? <Switch checked={props.link.admin} /> : <Switch />}
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}

export function CreateUserButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const CreateUserForm = () => {
    const onFinish = async (values: any) => {
      const name = values.username;
      const textPassword = values.password;
      const password = await encryptPassword(textPassword);
      let admin = values.admin;

      if (admin === undefined) {
        admin = false;
      }

      createUser({ name, password, admin });
      setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    return <UserForm onFinish={onFinish} onFinishFailed={onFinishFailed} />;
  };

  const UserModalContent = () => {
    return (
      <Modal
        title="Create User"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[null]}
      >
        <CreateUserForm />
      </Modal>
    );
  };

  return (
    <>
      <Button onClick={showModal} size="large">
        Create new user
      </Button>
      <UserModalContent />
    </>
  );
}

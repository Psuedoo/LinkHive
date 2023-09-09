"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { allLinks } from "../services/link";
import { default as NextLink } from "next/link";
import { Button, Card, Dropdown, Form, Input, Space, Switch } from "antd";
import { EditLinkContextItem } from "./editLinks";
import { DeleteLinkContextItem } from "./deleteLinks";
import type { FormInstance } from "antd/es/form";

function Link(LinkProps: any) {
  const { data: session } = useSession();
  const user = session?.user;
  const items = [
    {
      key: "1",
      label: <EditLinkContextItem {...LinkProps} />,
    },
    {
      key: "2",
      label: <DeleteLinkContextItem />,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={user ? ["contextMenu"] : []}>
        <NextLink href={LinkProps.url}>
          <Card>{LinkProps.title}</Card>
        </NextLink>
      </Dropdown>
    </>
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
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Space size={[8, 16]} wrap>
          {links}
        </Space>
      )}
    </>
  );
}

export function LinkForm(props: any) {
  const formRef = useRef<FormInstance>(null);

  useEffect(() => {
    if (formRef.current && props.link) {
      formRef.current?.setFieldsValue({
        title: props.link.title,
        url: props.link.url,
        authRequired: props.link.authRequired,
      });
    }
  }, [props, props.link, formRef]);

  return (
    <Form
      name="link"
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      layout="vertical"
      ref={formRef}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Links have to have a title" }]}
        initialValue={props.title}
      >
        <Input value="test" />
      </Form.Item>
      <Form.Item
        label="URL"
        name="url"
        rules={[{ required: true, message: "Links have to have a URL" }]}
        initialValue={props.url}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Auth Required" name="authRequired">
        <Switch checked={props.link.authRequired} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}

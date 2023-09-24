"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { default as NextLink } from "next/link";
import { Button, Card, Dropdown, Form, Input, Space, Switch } from "antd";
import { EditLinkContextItem } from "./editLinks";
import { DeleteLinkContextItem } from "./deleteLinks";
import type { FormInstance } from "antd/es/form";
import { Link } from "@prisma/client";
import { useRouter } from "next/navigation";

function Link({ link }: { link: Link }) {
  const { data: session } = useSession();
  const user = session?.user;
  const items = [
    {
      key: "1",
      label: <EditLinkContextItem {...link} />,
    },
    {
      key: "2",
      label: <DeleteLinkContextItem link={link} />,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={user ? ["contextMenu"] : []}>
        <NextLink href={link.url}>
          <Card className="bg-primary border-none text-text transition duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            {link.title}
          </Card>
        </NextLink>
      </Dropdown>
    </>
  );
}

export function LinksGrid({ links }: { links: Link[] }) {
  const linkComponents = links.map((link) => (
    <Link key={link.id} link={link} />
  ));

  return (
    <>
      <Space size={[8, 16]} wrap>
        {linkComponents}
      </Space>
    </>
  );
}

export function LinkForm({
  link,
  onFinish,
  onFinishFailed,
}: {
  link: Link | null;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
}) {
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
        initialValue={link?.title}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="URL"
        name="url"
        rules={[{ required: true, message: "Links have to have a URL" }]}
        initialValue={link?.url}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Auth Required" name="authRequired">
        <Switch defaultChecked={link ? link.authRequired : false} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}

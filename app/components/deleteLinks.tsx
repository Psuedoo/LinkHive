import { DeleteFilled } from "@ant-design/icons";
import { deleteLink } from "../services/link";
import { Popconfirm, message } from "antd";

export function DeleteLinkContextItem(props: any) {
  const confirm = () => {
    deleteLink({
      id: props.id,
    });
    message.success("Link deleted");
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

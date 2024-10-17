import { User } from "./SearchPanel";
import { Table } from "antd";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}
export default function List({ users, list }: ListProps) {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // 按照名称排序
        },
        {
          title: "负责人",
          dataIndex: "personId",
          key: "personId",
          render: (personId: string) => {
            return users.find((user) => user.id === personId)?.name || "未知";
          },
        },
      ]}
      dataSource={list}
    />
  );
}

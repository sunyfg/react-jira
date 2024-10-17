import dayjs from "dayjs";
import { User } from "./SearchPanel";
import { Table, TableProps } from "antd";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}
export default function List({ users, ...props }: ListProps) {
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // 按照名称排序
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "负责人",
          dataIndex: "personId",
          key: "personId",
          render: (personId: string) => {
            return users.find((user) => user.id === personId)?.name || "未知";
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
          key: "created",
          render: (created: number, project) => {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "未知"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
}

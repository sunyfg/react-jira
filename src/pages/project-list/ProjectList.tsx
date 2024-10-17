import dayjs from "dayjs";
import { User } from "./SearchPanel";
import { Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}
export default function List({ users, ...props }: ListProps) {
  const { mutate: editProject } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    editProject({ id, pin }).then(props.refresh);
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        // 收藏
        {
          title: <Pin checked={true} disabled />,
          render: (value, project) => {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // 按照名称排序
          render: (name: string, project) => {
            return <Link to={String(project.id)}>{name}</Link>;
          },
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
          render: (personId) => {
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

import dayjs from "dayjs";
import { User } from "./SearchPanel";
import { Dropdown, Menu, MenuProps, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal } from "./util";

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
}
export default function List({ users, ...props }: ListProps) {
  const { mutate } = useEditProject();
  const { startEdit } = useProjectModal();

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);

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
            return (
              users.find((user) => user.id === Number(personId))?.name || "未知"
            );
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
        {
          render: (val, project) => {
            const items: MenuProps["items"] = [
              {
                key: "edit",
                label: (
                  <ButtonNoPadding
                    type={"link"}
                    onClick={editProject(project.id)}
                  >
                    编辑
                  </ButtonNoPadding>
                ),
              },
              {
                key: "delete",
                label: "删除",
              },
            ];
            return (
              <Dropdown menu={{ items }}>
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
}

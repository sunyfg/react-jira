import dayjs from "dayjs";
import { User } from "../../types/user";
import { Dropdown, MenuProps, Modal, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useDeleteProject, useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal, useProjectQueryKey } from "./util";
import { Project } from "../../types/project";

interface ListProps extends TableProps<Project> {
  users: User[];
}
export default function List({ users, ...props }: ListProps) {
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        // 收藏
        {
          title: <Pin checked={true} disabled />,
          render: (value, project) => {
            console.log("🚀 ~ List ~ value:", value);
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
            console.log("🚀 ~ List ~ created:", created);
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
            console.log("🚀 ~ List ~ val:", val);
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());

  const confirmDeleteProject = (id: number) => () => {
    Modal.confirm({
      title: "确定删除吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteProject({ id });
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "edit",
      label: (
        <ButtonNoPadding type={"link"} onClick={editProject(project.id)}>
          编辑
        </ButtonNoPadding>
      ),
    },
    {
      key: "delete",
      label: (
        <ButtonNoPadding
          type={"link"}
          onClick={confirmDeleteProject(project.id)}
        >
          删除
        </ButtonNoPadding>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

import { Button, Drawer, Form, Input, Spin } from "antd";
import {
  useProjectModal,
  useProjectQueryKey,
} from "../pages/project-list/util";
import { UserSelect } from "./user-select";
import { useAddProject, useEditProject } from "../utils/project";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { ErrorBox } from "./lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const [form] = useForm();

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectQueryKey());

  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
    return () => {
      form.resetFields();
    };
  }, [editingProject, form]);

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  return (
    <Drawer
      forceRender={true}
      onClose={close}
      open={projectModalOpen}
      width={"100%"}
    >
      {isLoading && editingProject ? (
        <Spin size={"large"} />
      ) : (
        <Container>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout={"vertical"}
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label={"名称"}
              name={"name"}
              rules={[{ required: true, message: "请输入项目名称" }]}
            >
              <Input placeholder="请输入项目名称" />
            </Form.Item>
            <Form.Item
              label={"部门"}
              name={"organization"}
              rules={[{ required: true, message: "请输入部门名称" }]}
            >
              <Input placeholder="请输入部门名称" />
            </Form.Item>
            <Form.Item label={"负责人"} name={"personId"}>
              <UserSelect defaultOption="负责人" />
            </Form.Item>

            <Form.Item style={{ textAlign: "right" }}>
              <Button
                loading={mutateLoading}
                htmlType={"submit"}
                type={"primary"}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </Container>
      )}
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

import styled from "@emotion/styled";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import { ErrorBox } from "../../components/lib";
import { useAddEpic } from "../../utils/epic";
import { useEpicQueryKey } from "./utils";
import { useEffect } from "react";
import { useProjectIdInUrl } from "../kanban/utils";

export const CreateEpic = (
  props: Pick<DrawerProps, "open"> & { onClose: () => void },
) => {
  const {
    mutateAsync: addEpic,
    isLoading,
    error,
  } = useAddEpic(useEpicQueryKey());
  const [form] = Form.useForm();
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId: projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.open]);

  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      forceRender
      // destroyOnClose
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Container>
            <Spin size={"large"} />
          </Container>
        ) : (
          <Container>
            <h1>创建任务组</h1>
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
                rules={[{ required: true, message: "请输入任务组名" }]}
              >
                <Input placeholder="请输入任务组名" />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
                  htmlType={"submit"}
                  type={"primary"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Container>
        )}
      </Container>
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

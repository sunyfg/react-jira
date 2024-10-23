import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useTaskModal, useTasksQueryKey } from "./utils";
import { useDeleteTask, useEditTask } from "../../utils/task";
import { useEffect } from "react";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/task-type-select";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } =
    useEditTask(useTasksQueryKey());
  const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields(); // 重置表单
  };

  const onOk = async () => {
    await editTask({
      ...editingTask,
      ...form.getFieldsValue(),
    });
    close();
  };

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "确认",
      cancelText: "取消",
      title: "确定要删除吗？",
      onOk: async () => {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      open={!!editingTaskId}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form {...layout} form={form} initialValues={editingTask}>
        <Form.Item
          label="任务名"
          name="name"
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="经办人" name="processorId">
          <UserSelect defaultOption={"经办人"} />
        </Form.Item>
        <Form.Item label="类型" name="typeId">
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button
          style={{ fontSize: "14px" }}
          size={"small"}
          onClick={startDelete}
        >
          删除
        </Button>
      </div>
    </Modal>
  );
};

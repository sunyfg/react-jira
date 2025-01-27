import { useEffect, useState } from "react";
import { useAddTask } from "../../utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./utils";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());

  const projectId = useProjectIdInUrl();

  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) return <div onClick={toggle}>+ 创建事务</div>;

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做些什么"}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  );
};

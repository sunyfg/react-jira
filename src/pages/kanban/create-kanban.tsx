import { useState } from "react";
import { useKanbanQueryKey, useProjectIdInUrl } from "./utils";
import { useAddKanban } from "../../utils/kanban";
import { Input } from "antd";
import { Container } from "./kanban-column";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());

  const submit = async () => {
    await addKanban({ name, projectId });
    // reset the form
    setName("");
  };

  return (
    <Container>
      <Input
        size="large"
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Container>
  );
};

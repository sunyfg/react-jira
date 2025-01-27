import { Button, Input } from "antd";
import { Row } from "../../components/lib";
import { useSetUrlSearchParams } from "../../utils/url";
import { useTasksSearchParams } from "./utils";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/task-type-select";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParams();

  const reset = () => {
    setSearchParams({
      typeId: undefined,
      tagId: undefined,
      processorId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBottom={4} gap>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOption={"经办人"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOption={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};

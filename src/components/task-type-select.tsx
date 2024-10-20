import { useTaskTypes } from "../utils/task-types";
import { IdSelect } from "./id-select";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>,
) => {
  const { data: taskTypes } = useTaskTypes();

  return <IdSelect options={taskTypes || []} {...props} />;
};

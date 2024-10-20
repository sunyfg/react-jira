import styled from "@emotion/styled";
import { useKanban } from "../../utils/kanban";
import { useDocumentTitle } from "../../utils/utils";
import { KanbanColumn } from "./kanban-column";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./utils";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";

export default function KanbanScreen() {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();

  const { data: kanbans, isLoading: kanbanIsLoading } = useKanban(
    useKanbanSearchParams(),
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => {
            return <KanbanColumn key={kanban.id} kanban={kanban} />;
          })}
          <CreateKanban />
        </ColumnsContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

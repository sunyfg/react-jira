import styled from "@emotion/styled";
import { useKanbans, useReorderKanban } from "../../utils/kanban";
import { useDocumentTitle } from "../../utils/utils";
import { KanbanColumn } from "./kanban-column";
import {
  useKanbanQueryKey,
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./utils";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useReorderTask, useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";
import { useCallback } from "react";

export default function KanbanScreen() {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();

  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams(),
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;

  const onDragEnd = useDrapEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop type={"COLUMN"} direction="horizontal" droppableId="kanban">
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanban" + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
}

// 拖拽结束
export const useDrapEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      console.log("aaa=", source, destination, type);
      if (!destination) {
        return;
      }

      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        // 重新排序
        reorderKanban({ fromId, referenceId: toId, type });
      }

      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        // if (fromKanbanId === toKanbanId) {
        //   return;
        // }
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId,
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask.id === toTask.id) {
          return;
        }
        reorderTask({
          fromId: fromTask.id,
          referenceId: toTask.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, reorderTask, allTasks],
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

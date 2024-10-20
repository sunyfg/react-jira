import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useUrlQueryParam } from "../../utils/url";
import { useCallback, useMemo } from "react";
import { useTask } from "../../utils/task";
import useDebounce from "../../hooks/useDebounce";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();

  const id = pathname.match(/projects\/(\d+)/)?.[1];

  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  const debouncedName = useDebounce(param.name, 500);
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      tagId: Number(param.tagId) || undefined,
      processorId: Number(param.processorId) || undefined,
      name: debouncedName || undefined,
    }),
    [projectId, param],
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingProjectId] = useUrlQueryParam([
    "editingTaskId",
  ]);

  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => {
      setEditingProjectId({ editingTaskId: id });
    },
    [setEditingProjectId],
  );

  const close = useCallback(() => {
    setEditingProjectId({ editingTaskId: undefined });
  }, [setEditingProjectId]);

  return {
    editingTaskId,
    editingTask,
    isLoading,
    startEdit,
    close,
  };
};

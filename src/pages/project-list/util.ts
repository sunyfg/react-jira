import { useMemo, useState } from "react";
import { useUrlQueryParam } from "../../utils/url";
import { useProject } from "../../utils/project";

export const useProjectsSearchParams = () => {
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useUrlQueryParam(keys);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param],
    ),
    setParam,
  ] as const;
};

export const useProjectQueryKey = () => {
  const [param] = useProjectsSearchParams();
  console.log(["projects", param]);
  return ["projects", param];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId),
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    // console.log("🚀 ~ close ~ close:");
    setProjectCreate({ projectCreate: undefined });
    if (editingProjectId) {
      setEditingProjectId({ editingProjectId: undefined });
    }
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading: isLoading && Boolean(editingProjectId),
  };
};

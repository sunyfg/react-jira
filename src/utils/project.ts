import { useHttp } from "./http";
import { removeEmptyValue } from "./utils";
import { Project } from "../pages/project-list/ProjectList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: removeEmptyValue(param || {}) }),
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { data: params, method: "PATCH" }),
    {
      onSuccess: () => queryClient.invalidateQueries(["projects"]),
    },
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { data: params, method: "POST" }),
    {
      onSuccess: () => queryClient.invalidateQueries(["projects"]),
    },
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    },
  );
};

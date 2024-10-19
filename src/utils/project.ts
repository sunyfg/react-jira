import { useHttp } from "./http";
import { removeEmptyValue } from "./utils";
import { Project } from "../pages/project-list/ProjectList";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useProjectsSearchParams } from "../pages/project-list/util";
import {
  useAddConfig,
  useDeleteConfig,
  useEditeConfig,
} from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: removeEmptyValue(param || {}) }),
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { data: params, method: "PATCH" }),
    useEditeConfig(queryKey),
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { data: params, method: "POST" }),
    useAddConfig(queryKey),
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`projects/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey),
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

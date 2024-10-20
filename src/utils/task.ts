import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useHttp } from "./http";
import { Task } from "../types/task";
import { useAddConfig, useEditeConfig } from "./use-optimistic-options";

// 获取任务列表
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param }),
  );
};

// 添加任务
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, { data: { typeId: 1, ...params }, method: "POST" }),
    useAddConfig(queryKey),
  );
};

// 获取任务详情
export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

// 编辑任务
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, { data: params, method: "PATCH" }),
    useEditeConfig(queryKey),
  );
};

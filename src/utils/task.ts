import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useHttp } from "./http";
import { Task } from "../types/task";
import { useAddConfig } from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param }),
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, { data: { typeId: 1, ...params }, method: "POST" }),
    useAddConfig(queryKey),
  );
};

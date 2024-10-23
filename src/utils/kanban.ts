import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

// 获取看板列表
export const useKanban = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param }),
  );
};

// 添加看板
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client("kanbans", { data: params, method: "POST" }),
    useAddConfig(queryKey),
  );
};

// 删除看板
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`kanbans/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey),
  );
};

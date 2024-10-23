import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { Epic } from "../types/epic";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderConfig,
} from "./use-optimistic-options";

// 获取看板列表
export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", { data: param }),
  );
};

// 添加看板
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      client("epics", { data: params, method: "POST" }),
    useAddConfig(queryKey),
  );
};

// 删除看板
export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`epics/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey),
  );
};

export interface SortProps {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
  fromEpicId?: number;
  toEpicId?: number;
}
// 重新排序看板
export const useReorderEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: SortProps) =>
      client("epics/reorder", {
        data: params,
        method: "POST",
      }),
    useReorderConfig(queryKey),
  );
};

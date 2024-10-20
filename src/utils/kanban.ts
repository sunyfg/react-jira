import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

export const useKanban = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param }),
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client("kanbans", { data: params, method: "POST" }),
    useAddConfig(queryKey),
  );
};

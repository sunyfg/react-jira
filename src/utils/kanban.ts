import { useQuery } from "@tanstack/react-query";
import { Kanban } from "../types/kanban";
import { useHttp } from "./http";

export const useKanban = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param }),
  );
};

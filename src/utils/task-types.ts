import { useQuery } from "@tanstack/react-query";
import { useHttp } from "./http";
import { TaskType } from "../types/task-type";

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};

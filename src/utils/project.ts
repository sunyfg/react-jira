import { useEffect } from "react";
import { useHttp } from "./http";
import useAsync from "../hooks/useAsync";
import { removeEmptyValue } from "./utils";
import { Project } from "../pages/project-list/ProjectList";

export const useProjects = (param: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: removeEmptyValue(param) }));
  }, [param]);

  return result;
};

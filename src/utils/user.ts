import { useQuery } from "@tanstack/react-query";
// import useAsync from "../hooks/useAsync";
// import useMount from "../hooks/useMount";
import { User } from "../types/user";
import { useHttp } from "./http";
import { removeEmptyValue } from "./utils";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: removeEmptyValue(param || {}) }),
  );
};

import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { removeEmptyValue } from "./utils";

/**
 * 返回 url中，指定参数的值
 */
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce(
          (prev, key) => {
            return { ...prev, [key]: searchParams.get(key) || "" };
          },
          {} as { [key in T]: string },
        ),
      [searchParams, keys],
    ),
    (params: Partial<{ [key in T]: string }>) => {
      const o = removeEmptyValue({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      setSearchParams(o);
    },
  ] as const;
};

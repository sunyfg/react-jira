import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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
    setSearchParams, // 返回 setSearchParams，方便在组件中调用
  ] as const;
};

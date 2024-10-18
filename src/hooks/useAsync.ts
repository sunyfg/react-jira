import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "../utils/utils";

interface State<D> {
  data: D | null;
  error: Error | null;
  status: "idle" | "loading" | "success" | "error";
}

const defaultInitialState: State<null> = {
  data: null,
  error: null,
  status: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef],
  );
};

const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    },
  );

  const [retry, setRetry] = useState(() => () => {});

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) => safeDispatch({ data, status: "success", error: null }),
    [safeDispatch],
  );

  const setError = useCallback(
    (error: Error) => safeDispatch({ error, status: "error", data: null }),
    [safeDispatch],
  );

  // 触发异步操作
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || typeof promise.then !== "function") {
        throw new Error("Promise argument required");
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      safeDispatch({ status: "loading" });

      return promise
        .then((data) => {
          // 模拟延迟1秒
          setTimeout(() => {
            setData(data);
          }, 1000);
          return data;
        })
        .catch((error: Error) => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, safeDispatch, setData, setError],
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};

export default useAsync;

import { useState } from "react";
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

const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const [retry, setRetry] = useState(() => () => {});
  const mountedRef = useMountedRef();

  const setData = (data: D) =>
    setState({ data, status: "success", error: null });

  const setError = (error: Error) =>
    setState({ error, status: "error", data: null });

  // 触发异步操作
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> },
  ) => {
    if (!promise || typeof promise.then !== "function") {
      throw new Error("Promise argument required");
    }

    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });

    setState({ ...state, status: "loading", error: null });

    return promise
      .then((data) => {
        // 模拟延迟1秒
        setTimeout(() => {
          if (mountedRef.current) {
            setData(data);
          }
        }, 1000);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      });
  };

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

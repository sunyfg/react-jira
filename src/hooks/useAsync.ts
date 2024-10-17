import { useState } from "react";

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

const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({ data, status: "success", error: null });

  const setError = (error: Error) =>
    setState({ error, status: "error", data: null });

  // 触发异步操作
  const run = (promise: Promise<D>) => {
    if (!promise || typeof promise.then !== "function") {
      throw new Error("Promise argument required");
    }

    setState({ ...state, status: "loading", error: null });

    return promise
      .then((data) => {
        // 模拟延迟1秒
        setTimeout(() => {
          setData(data);
        }, 1000);
        return data;
      })
      .catch((error) => {
        setError(error);
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
    ...state,
  };
};

export default useAsync;

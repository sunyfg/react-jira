import { useCallback, useState } from "react";

/**
 * 自定义撤销/重做钩子
 * @param initialPresent initial state
 */
export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[]; // past 用于存储已经撤销的状态
    present: T; // present 用于存储当前状态
    future: T[]; // future 用于存储已经重做的状态
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  // canUndo 和 canRedo 用于判断是否可以撤销和重做
  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  // undo 函数用于撤销操作
  const undo = useCallback(() => {
    setState((prevState) => {
      const { past, present, future } = prevState;
      if (past.length === 0) return prevState;

      const previous = past[past.length - 1]; // 获取最后一个 past 状态
      const newPast = past.slice(0, past.length - 1); // 删除最后一个 past 状态

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  // redo 函数用于重做操作
  const redo = useCallback(() => {
    setState((prevState) => {
      const { past, present, future } = prevState;
      if (future.length === 0) return prevState;

      const next = future[0]; // 获取第一个 future 状态
      const newFuture = future.slice(1); // 删除第一个 future 状态

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  // set 函数用于设置当前状态
  const set = useCallback((newPresent: T) => {
    setState((prevState) => {
      const { past, present, future } = prevState;
      if (newPresent === present) return prevState;

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    });
  }, []);

  return [
    state,
    {
      set,
      undo,
      redo,
      canUndo,
      canRedo,
      reset,
    },
  ] as const;
};

import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[]; // past 用于存储已经撤销的状态
  present: T; // present 用于存储当前状态
  future: T[]; // future 用于存储已经重做的状态
};

type Action<T> = {
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
  newPresent?: T;
};

const undoReducer = <T>(state: State<T>, actions: Action<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = actions;
  switch (type) {
    case UNDO: {
      if (past.length === 0) return state;

      const previous = past[past.length - 1]; // 获取最后一个 past 状态
      const newPast = past.slice(0, past.length - 1); // 删除最后一个 past 状态

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case REDO: {
      if (future.length === 0) return state;

      const next = future[0]; // 获取第一个 future 状态
      const newFuture = future.slice(1); // 删除第一个 future 状态

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case SET: {
      if (newPresent === present) return state;

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
    default:
      return state;
  }
};

/**
 * 自定义撤销/重做钩子
 * @param initialPresent initial state
 */
export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  // canUndo 和 canRedo 用于判断是否可以撤销和重做
  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  // undo 函数用于撤销操作
  const undo = useCallback(() => dispatch({ type: UNDO }), []);

  // redo 函数用于重做操作
  const redo = useCallback(() => dispatch({ type: REDO }), []);

  // set 函数用于设置当前状态
  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    [],
  );

  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent }),
    [],
  );

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

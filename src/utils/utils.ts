import { useEffect, useRef } from "react";

// 删除对象中的空值
export function removeEmptyValue(obj: { [key: string]: unknown }) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    }
  }
  return obj;
}

// 重置路由
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件挂在状态
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

// 设置页面标题
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (keepOnUnmount) {
        // 如果设置了keepOnUnmount为true，则在组件卸载时恢复旧的页面标题
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

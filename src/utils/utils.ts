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

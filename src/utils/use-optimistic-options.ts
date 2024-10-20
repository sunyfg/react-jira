import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, oldData: any[]) => any[],
) => {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // onMutate 是一个可选的回调函数，它会在 mutation 开始之前被调用，并且可以返回一个对象，这个对象会被传递给 onError 和 onSettled 回调函数。
    async onMutate(target: any) {
      console.log("🚀 ~ onMutate ~ target:", target);
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldData?: any[]) => {
        return callback(target, oldData || []);
      });
      return { previousItems };
    },
    // // onError 是一个可选的回调函数，它会在 mutation 失败时被调用，并且可以接收一个错误对象和一个上下文对象。
    onError(error: any, target: any, context: any) {
      // 回滚
      queryClient.setQueryData(queryKey, context?.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old.filter((item) => item.id !== target.id),
  );

export const useEditeConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old.map((item) => {
      console.log("🚀 ~ old.map ~ item:", item.id === target.id);
      if (item.id === target.id) {
        return { ...item, ...target };
      }
      return item;
    }),
  );

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => [...old, target]);

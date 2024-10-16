// 删除对象中的空值
export function removeEmptyValue(obj: any) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    }
  }
  return obj;
}

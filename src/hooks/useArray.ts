import { useState } from "react";

// This custom hook is used to manage an array of items.
const useArray = <T>(array: T[]) => {
  const [value, setValue] = useState(array);

  const add = (item: T) => {
    setValue((prev) => [...prev, item]);
  };

  const removeIndex = (index: number) => {
    setValue((prev) => prev.filter((_, i) => i !== index));
  };

  const clear = () => {
    setValue([]);
  };

  return { value, add, removeIndex, clear };
};

export default useArray;

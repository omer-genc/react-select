import { createContext, useContext } from "react";

import type { ContextProps } from "./select.types";

export const Context = createContext<ContextProps>({
  state: {
    items: [],
    selectedItems: [],
  },
  event: {
    onChange: () => {},
    setSearch: () => {},
  },
});

export const Consumer = Context.Consumer;

export const useSelectContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectContext');
  }
  return context;
};
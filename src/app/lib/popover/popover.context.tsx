import { createContext, useContext } from 'react';
import type { ContextProps } from './popover.types';

export const Context = createContext<ContextProps | null>(null);

export const usePopover = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('usePopover must be used within a PopoverContext');
  }
  return context;
}

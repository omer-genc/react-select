import { ReactElement } from 'react';

export type Rect = {
  left: number;
  top: number;
  height: number;
  width: number;
};

export type Props = {
  children: React.ReactNode;
};

export type ContextProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRect: Rect;
  setTriggerRect: React.Dispatch<React.SetStateAction<Rect>>;
  minWidth: number;
  setMinWidth: React.Dispatch<React.SetStateAction<number>>;
};

export type TriggerProps = {
  children: ReactElement;
};

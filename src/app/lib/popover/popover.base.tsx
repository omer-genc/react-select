import React, {
  cloneElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { usePopover, Context } from './popover.context';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { calculatePopeverCoords } from './popover.utils';

import type { FC } from 'react';
import type { Props, TriggerProps } from './popover.types';

import { defaultRect } from './popover.constants';
import { createPortal } from 'react-dom';

export const Root: FC<Props> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [triggerRect, setTriggerRect] = useState(defaultRect);
  const [minWidth, setMinWidth] = useState(0);
  const contextValue = {
    show,
    setShow,
    triggerRect,
    setTriggerRect,
    minWidth,
    setMinWidth,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const Trigger: FC<TriggerProps> = ({ children }) => {
  const { setShow, setTriggerRect, setMinWidth } = usePopover();

  const ref = useRef<HTMLElement>(null);

  const onClick = () => {
    const element = ref.current;
    if (element == null) {
      return;
    }

    const rect = element.getBoundingClientRect();
    setShow(true);
    setTriggerRect(rect);
  };

  useEffect(() => {
    const element = ref.current;

    if (element == null) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect();
      setTriggerRect(rect);
      setMinWidth(rect.width);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, setTriggerRect, setMinWidth]);

  const trigger = React.cloneElement(children, {
    onClick,
    ref,
  });

  return trigger;
};

// popover gözükmediğinde performans için contentin renderlanmasını engelliyor
const ContentWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { triggerRect, setShow, minWidth } = usePopover();
  const [coords, setCoords] = useState({
    left: 0,
    top: 0,
  });

  const dismiss = useCallback(() => {
    setShow(false);
  }, []);

  const ref = useOutsideClick<HTMLDialogElement>(dismiss);

  useLayoutEffect(() => {
    const element = ref.current;
    if (element == null) {
      return;
    }

    const rect = element.getBoundingClientRect();

    const coords = calculatePopeverCoords(triggerRect, rect);
    setCoords(coords);
  }, [ref, triggerRect]);

  return createPortal(
    <dialog
      open={true}
      ref={ref}
      style={{
        position: 'fixed',
        left: `${coords.left}px`,
        top: `${coords.top}px`,
        margin: 0,
        border: 'none',
        padding: 0,
        background: 'transparent',
        boxShadow: 'none',
        minWidth: `${minWidth - 10}px`,
      }}
    >
      {children}
    </dialog>,
    document.body
  );
};

export const Content: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { show } = usePopover();

  if (!show) {
    return null;
  }

  return <ContentWrapper>{children}</ContentWrapper>;
};

export const Close: FC<{ children: React.ReactElement }> = ({ children }) => {
  const { setShow } = usePopover();
  const onClick = (e: MouseEvent) => {
    setShow(false);
    // popover kapandıktan sonra trigger elementine tıklanmasını engellemek için
    e.stopPropagation();
  };

  const childrenToClosePopover = cloneElement(children, {
    onClick,
  });

  return childrenToClosePopover;
};

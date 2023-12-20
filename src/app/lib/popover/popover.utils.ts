import { Rect } from "./popover.types";

export const calculatePopeverCoords = (triggerRect: Rect, popoverRect: Rect) => {
  const top = triggerRect.top + triggerRect.height + 10;

  const left = Math.max(
    triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2,
    10
  );

  // failover to top if there is not enough space
  if (top + popoverRect.height > window.innerHeight - 10) {
    return {
      top: triggerRect.top - 10 - popoverRect.height,
      left,
    };
  }

  return {
    top,
    left,
  };
};
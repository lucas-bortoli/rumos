import { RefObject, useEffect } from "react";
import useCurrentRef from "../../Lib/use_current_ref";

type Direction = "up" | "down" | "left" | "right";

interface UseSwipeOptions {
  target: RefObject<HTMLElement | null>;
  onSwipeEnd: (direction: Direction, threshold: number) => void;
  threshold?: number;
  velocity?: number;
}

export function useSwipe({
  target,
  onSwipeEnd,
  threshold = 30,
  velocity = 0.1,
}: UseSwipeOptions): void {
  const onSwipeEndRef = useCurrentRef(onSwipeEnd);

  useEffect(() => {
    const element = target.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isSwiping = false;

    const handleStart = (x: number, y: number) => {
      startX = x;
      startY = y;
      startTime = Date.now();
      isSwiping = true;
    };

    const handleEnd = (x: number, y: number) => {
      if (!isSwiping || !element) return;
      isSwiping = false;

      const deltaX = x - startX;
      const deltaY = y - startY;
      const timeDelta = Date.now() - startTime;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const velocityX = absX / timeDelta;
      const velocityY = absY / timeDelta;

      const distance = Math.max(absX, absY);

      if (distance < threshold || Math.max(velocityX, velocityY) < velocity) return;

      const direction = absX > absY ? (deltaX > 0 ? "right" : "left") : deltaY > 0 ? "down" : "up";

      onSwipeEndRef.current(direction, distance);
    };

    // Unified pointer handler
    const onPointerStart = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      handleStart(e.clientX, e.clientY);
    };

    const onPointerEnd = (e: PointerEvent) => {
      handleEnd(e.clientX, e.clientY);
    };

    // Touch-specific handlers
    const onTouchStart = (e: TouchEvent) => {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onTouchEnd = (e: TouchEvent) => {
      handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    };

    // Event listeners
    element.addEventListener("pointerdown", onPointerStart);
    element.addEventListener("pointerup", onPointerEnd);
    element.addEventListener("touchstart", onTouchStart, { passive: true });
    element.addEventListener("touchend", onTouchEnd);
    element.addEventListener("touchcancel", () => (isSwiping = false));

    // Cleanup
    return () => {
      element.removeEventListener("pointerdown", onPointerStart);
      element.removeEventListener("pointerup", onPointerEnd);
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchend", onTouchEnd);
      element.removeEventListener("touchcancel", () => (isSwiping = false));
    };
  }, [target, threshold, velocity]);
}

import { useEffect, RefObject, useId } from "react";

type UseHorizontalPanOptions = {
  enabled?: boolean;
};

/**
 * Enables horizontal panning (click-and-drag scrolling) with the mouse for desktop users,
 * while preserving native touch scrolling on mobile devices.
 *
 * This hook allows a user to press and drag within a scrollable container to scroll horizontally,
 * mimicking touch-like behavior. It also cancels click events if dragging occurred,
 * preventing accidental interactions while scrolling.
 *
 * @template T - The HTMLElement type for the scroll container.
 * @param ref - A ref to the scrollable container element.
 * @param options - Optional configuration.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useMouseHorizontalPanScroll(ref);
 *
 * return <div ref={ref}> ... </div>;
 *
 * @remarks
 * - This hook adds event listeners only on desktop (mouse-based) devices.
 * - Touch devices are unaffected and retain their default native scrolling.
 * - The hook uses `stopPropagation` and `preventDefault` on `click` events
 *   when a drag is detected, avoiding accidental clicks on child elements.
 */
export default function useMouseHorizontalPanScroll<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseHorizontalPanOptions = {}
) {
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el || options.enabled === false) return;

    let isDown = false;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      isDragging = false;
      el.classList.add("grabbing");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseup", onMouseUp);
      el.addEventListener("mouseleave", onMouseLeave);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = x - startX;

      if (Math.abs(walk) > 5) {
        isDragging = true;
      }

      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      isDown = false;
      el.classList.remove("grabbing");

      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
    };

    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove("grabbing");
    };

    const onClick = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        isDragging = false;
      }
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("click", onClick, true);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("click", onClick, true);
    };
  }, [ref, options.enabled, id]);
}

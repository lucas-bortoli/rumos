import { RefObject, useCallback, useEffect, useRef, useState } from "react";

interface UseZoomOptions {
  initialScale?: number;
  onZoomStart?: () => void;
  onZoomEnd?: (scale: number) => void;
  updateZoomEager?: (zoom: number) => void;
}

const minScale = 0.25;

function useZoom(
  elementRef: RefObject<HTMLElement | null>,

  { initialScale, onZoomStart, onZoomEnd, updateZoomEager }: UseZoomOptions = {}
): number {
  const [scale, setScale] = useState(initialScale ?? 1);
  const scaleRef = useRef(scale);
  const gestureScaleRef = useRef(scale);
  const isZooming = useRef(false);
  const initialPinchState = useRef({
    distance: 0,
    scale: 1,
  });

  // Sync React state => ref
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  const eagerUpdate = useCallback(
    (newScale: number) => {
      gestureScaleRef.current = newScale;
      updateZoomEager?.(newScale);
    },
    [updateZoomEager]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    function startPinch(t1: Touch, t2: Touch) {
      isZooming.current = true;
      initialPinchState.current = {
        distance: Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY),
        scale: gestureScaleRef.current,
      };
      onZoomStart?.();
    }

    function handleWheel(e: WheelEvent) {
      if (!e.shiftKey) return;
      if (e.cancelable) e.preventDefault();

      const delta = -e.deltaY;
      const zoomIntensity = 0.001;
      const newScale = Math.max(minScale, gestureScaleRef.current * (1 + delta * zoomIntensity));

      gestureScaleRef.current = newScale;
      eagerUpdate(newScale);
      setScale(newScale);
    }

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 2) {
        if (e.cancelable) e.preventDefault();
        startPinch(e.touches[0], e.touches[1]);
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (!isZooming.current || e.touches.length !== 2) return;
      if (e.cancelable) e.preventDefault();

      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDistance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

      const newScale = Math.max(
        minScale,
        initialPinchState.current.scale * (currentDistance / initialPinchState.current.distance)
      );

      gestureScaleRef.current = newScale;
      eagerUpdate(newScale);
    }

    function endZoom() {
      if (!isZooming.current) return;

      isZooming.current = false;
      setScale(gestureScaleRef.current);
      onZoomEnd?.(gestureScaleRef.current);
    }

    function handleTouchEnd(e: TouchEvent) {
      if (e.touches.length < 2) {
        endZoom();
      }
    }

    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("touchstart", handleTouchStart, { passive: false });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("wheel", handleWheel);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [elementRef, onZoomStart, onZoomEnd, eagerUpdate]);

  return scale;
}

export default useZoom;

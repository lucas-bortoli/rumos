import { PropsWithChildren, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { cn } from "../class_names";
import useZoom from "./useZoom";

interface DocScrollProps extends PropsWithChildren {
  className?: string;
}

export default function DocScroll(props: DocScrollProps) {
  const zoomTarget = useRef<HTMLDivElement>(null);
  const scale = useZoom(
    zoomTarget,
    useMemo(
      () => ({
        initialScale: 0.75,
        updateZoomEager: (zoom) => {
          if (zoomTarget.current) {
            zoomTarget.current.style.zoom = zoom.toString();
          }
        },
      }),
      []
    )
  );

  useEffect(() => {
    console.log("Scale updated: ", scale);
  }, [scale]);

  useLayoutEffect(() => {
    if (!zoomTarget.current) return;

    zoomTarget.current.scrollLeft = (zoomTarget.current.scrollWidth / 4) * scale;
  }, []);

  return (
    <div
      className={cn("relative overflow-scroll", props.className)}
      ref={zoomTarget}
      style={{
        zoom: `${scale}`,
        transformOrigin: "center",
        touchAction: "pan-x pan-y",
      }}>
      <div className="w-[960px]">{props.children}</div>
    </div>
  );
}

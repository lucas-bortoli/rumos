import { PropsWithChildren, useRef } from "react";
import { cn } from "../../../../Lib/class_names";
import useMouseHorizontalPanScroll from "../../../../Lib/mouse_scroll_panning/use_mouse_horizontal_pan_scroll";

interface HorizontalListProps {
  className?: string;
  children?: PropsWithChildren["children"];
}

export default function HorizontalList(props: HorizontalListProps) {
  const listRef = useRef<HTMLUListElement | null>(null);

  useMouseHorizontalPanScroll(listRef);

  return (
    <ul
      ref={listRef}
      className={cn("flex w-full overflow-x-scroll before:mr-4 after:ml-4", props.className)}>
      {props.children}
    </ul>
  );
}

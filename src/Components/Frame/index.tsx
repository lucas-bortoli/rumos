import type { PropsWithChildren, Ref } from "react";
import { cn } from "../../Lib/class_names";
import style from "./frame.module.css";

interface FrameProps extends PropsWithChildren {
  className?: string;
  ref?: Ref<HTMLElement>;
}

export default function Frame(props: FrameProps) {
  return (
    <section ref={props.ref} className={cn(style["frame"], "p-6", props.className)}>
      {props.children}
    </section>
  );
}

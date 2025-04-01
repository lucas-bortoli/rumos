import { PropsWithChildren } from "react";
import { cn } from "../../Lib/class_names";
import style from "./frame.module.css";

interface FrameProps extends PropsWithChildren {
  className?: string;
}

export default function Frame(props: FrameProps) {
  return <section className={cn(style["frame"], "p-6", props.className)}>{props.children}</section>;
}

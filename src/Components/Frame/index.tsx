import { PropsWithChildren } from "react";
import style from "./frame.module.css";
import { cn } from "../../Lib/class_names";

interface FrameProps extends PropsWithChildren {
  className?: string;
}

export default function Frame(props: FrameProps) {
  return <section className={cn(style["frame"], props.className)}>{props.children}</section>;
}

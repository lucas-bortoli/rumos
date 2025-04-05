import { ButtonHTMLAttributes, PropsWithChildren, Ref } from "react";
import { cn } from "../../Lib/class_names";
import style from "./style.module.css";

export interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonRef?: Ref<HTMLButtonElement>;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-sm bg-gray-100 px-8 py-2 font-semibold shadow-sm",
        style.button,
        props.className
      )}
      ref={props.buttonRef}>
      {props.children}
    </button>
  );
}

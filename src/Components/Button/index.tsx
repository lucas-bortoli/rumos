import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  Ref,
  useCallback,
} from "react";
import { cn } from "../../Lib/class_names";
import style from "./style.module.css";
import useSound from "../../Lib/sound";

export interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonRef?: Ref<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps) {
  const playButtonSound = useSound({ name: "SndButton2" });
  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    playButtonSound();
    props.onClick?.(event);
  }

  return (
    <button
      {...props}
      onClick={onClick}
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

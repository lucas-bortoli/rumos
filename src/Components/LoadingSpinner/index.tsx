import { cn } from "../../Lib/class_names";
import style from "./style.module.css";

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  return (
    <div className={cn(style.spinner, props.className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

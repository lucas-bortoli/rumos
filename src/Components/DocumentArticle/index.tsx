import { PropsWithChildren, Ref } from "react";
import { cn } from "../../Lib/class_names";
import DocumentStyle from "./document.module.css";

interface DocumentArticleProps extends PropsWithChildren {
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export default function DocumentArticle(props: DocumentArticleProps) {
  return (
    <article
      className={cn("overflow-y-scroll", DocumentStyle["doc-view"], props.className)}
      ref={props.ref}
    />
  );
}

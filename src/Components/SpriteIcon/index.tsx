import { CSSProperties } from "react";
import { cn } from "../../Lib/class_names";
import IconArchie128 from "./Archie128.png";
import IconHeart24 from "./Heart24.png";
import IconHeartLost24 from "./HeartLost24.png";

const Icons = {
  Heart24: [IconHeart24, 24],
  HeartLost24: [IconHeartLost24, 24],
  Archie128: [IconArchie128, 128],
} as const;

type IconName = keyof typeof Icons;

interface SpriteIconProps {
  name: IconName;
  className?: string;
  style?: CSSProperties;
}

export default function SpriteIcon(props: SpriteIconProps) {
  const icon = Icons[props.name];

  return (
    <img
      src={icon[0]}
      aria-label={props.name}
      className={cn("pointer-events-none aspect-square select-none", props.className)}
      style={{
        fontSize: `${icon[1]}px`,
        height: `${icon[1]}px`,
        imageRendering: "pixelated",
        ...props.style,
      }}
    />
  );
}

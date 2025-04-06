import { cn } from "../../Lib/class_names";
import IconArchie128 from "./Archie128.png";
import IconHeart24 from "./Heart24.png";
import IconHeartLost24 from "./HeartLost24.png";
import IconQuestion16 from "./Question16.png";
import IconSpinnerArrow16 from "./SpinnerArrow16.png";
import IconPlay16 from "./Play16.png";
import IconPause16 from "./Pause16.png";
import IconStop16 from "./Stop16.png";
import IconUndo16 from "./Undo16.png";
import IconSave16 from "./Save16.png";
import IconCheck16 from "./Check16.png";
import IconDropdownArrow16 from "./DropdownArrow16.png";
import { CSSProperties } from "react";

const Icons = {
  Heart24: [IconHeart24, 24],
  HeartLost24: [IconHeartLost24, 24],
  Archie128: [IconArchie128, 128],
  SpinnerArrow16: [IconSpinnerArrow16, 16],
  Question16: [IconQuestion16, 16],
  Play16: [IconPlay16, 16],
  Pause16: [IconPause16, 16],
  Stop16: [IconStop16, 16],
  Undo16: [IconUndo16, 16],
  Save16: [IconSave16, 16],
  Check16: [IconCheck16, 16],
  DropdownArrow16: [IconDropdownArrow16, 16],
} as const;

export type IconName = keyof typeof Icons;

interface SpriteIconProps {
  name: IconName;
  className?: string;
  style?: CSSProperties;
}

export const getIconUrl = (icon: IconName) => Icons[icon][0];

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

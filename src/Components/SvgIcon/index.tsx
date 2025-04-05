import { Ref } from "react";
import { cn } from "../../Lib/class_names";
import IconAccountCircle from "./AccountCircle.svg?react";
import IconBarChart from "./BarChart.svg?react";
import IconExplore from "./Explore.svg?react";
import IconHotelClass from "./HotelClass.svg?react";
import IconSwipeVertical from "./SwipeVertical.svg?react";

const Icons = {
  Explore: IconExplore,
  AccountCircle: IconAccountCircle,
  BarChart: IconBarChart,
  HotelClass: IconHotelClass,
  SwipeVertical: IconSwipeVertical,
} as const;

export type SvgIconName = keyof typeof Icons;

interface SvgIconProps {
  icon: SvgIconName;
  className?: string;
  ref?: Ref<SVGSVGElement>;
}

export default function SvgIcon(props: SvgIconProps) {
  const IconComponent = Icons[props.icon];

  return (
    <IconComponent
      height={undefined}
      width={undefined}
      fill="currentColor"
      className={cn("h-full", props.className)}
      ref={props.ref}
    />
  );
}

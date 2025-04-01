import { cn } from "../../Lib/class_names";
import IconAccountCircle from "./AccountCircle.svg?react";
import IconBarChart from "./BarChart.svg?react";
import IconExplore from "./Explore.svg?react";

const Icons = {
  Explore: IconExplore,
  AccountCircle: IconAccountCircle,
  BarChart: IconBarChart,
} as const;

type IconName = keyof typeof Icons;

interface SvgIconProps {
  icon: IconName;
  className?: string;
}

export default function SvgIcon(props: SvgIconProps) {
  const IconComponent = Icons[props.icon];

  return (
    <IconComponent
      height={undefined}
      width={undefined}
      fill="currentColor"
      className={cn("h-full", props.className)}
    />
  );
}

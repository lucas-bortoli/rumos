import TrailMenu from ".";
import { manifest } from "../../Lib/compass_navigator";

export const TrailMenuWindow = manifest(TrailMenu, {
  initialTitle: (props) => `Menu da Trilha: ${props.trail.title}`,
  hasAnimation: false,
});

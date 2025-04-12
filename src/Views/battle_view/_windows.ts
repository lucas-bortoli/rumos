import BattleContainer from ".";
import { manifest } from "../../Lib/compass_navigator";
import ZoomedCard from "./Components/zoomed_card";

export const BattleContainerWindow = manifest(BattleContainer, {
  initialTitle: () => "Duelo",
  hasAnimation: false,
});

export const ZoomedCardWindow = manifest(ZoomedCard, {
  initialTitle: (props) => `Visualizando carta: ${props.cardContent}`,
  hasAnimation: false,
});

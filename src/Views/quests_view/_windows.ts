import Quests from ".";
import { manifest } from "../../Lib/compass_navigator";

export const QuestsWindow = manifest(Quests, {
  initialTitle: () => "Minhas Quests",
  hasAnimation: false,
});

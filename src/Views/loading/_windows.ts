import LoadingScreen from ".";
import { manifest } from "../../Lib/compass_navigator";

export const LoadingScreenWindow = manifest(LoadingScreen, {
  initialTitle: () => "Loading",
  hasAnimation: false,
});

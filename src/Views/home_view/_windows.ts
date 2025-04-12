import Home from ".";
import { manifest } from "../../Lib/compass_navigator";

export const HomeWindow = manifest(Home, {
  initialTitle: () => "Minhas Trilhas",
  hasAnimation: false,
});

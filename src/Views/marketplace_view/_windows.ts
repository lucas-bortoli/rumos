import Marketplace from ".";
import { manifest } from "../../Lib/compass_navigator";

export const MarketplaceWindow = manifest(Marketplace, {
  initialTitle: () => "Marketplace",
  hasAnimation: false,
});

import { manifest } from "../../Lib/compass_navigator";
import FeedbackTab from "./feedback_tab";
import Marketplace from "./marketplace_tab";
import Quests from "./quests_tab";
import Home from "./trails_tab";

export const HomeWindow = manifest(Home, {
  initialTitle: () => "Minhas Trilhas",
  hasAnimation: false,
});

export const MarketplaceWindow = manifest(Marketplace, {
  initialTitle: () => "Marketplace",
  hasAnimation: false,
});

export const QuestsWindow = manifest(Quests, {
  initialTitle: () => "Minhas Quests",
  hasAnimation: false,
});

export const FeedbackTabWindow = manifest(FeedbackTab, {
  initialTitle: () => "Aba de Feedback",
  hasAnimation: false,
});

import FeedbackTab from ".";
import { manifest } from "../../Lib/compass_navigator";

export const FeedbackTabWindow = manifest(FeedbackTab, {
  initialTitle: () => "Aba de Feedback",
  hasAnimation: false,
});

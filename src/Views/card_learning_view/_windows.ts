import CardLearningIntro from ".";
import { manifest } from "../../Lib/compass_navigator";
import CardLearning from "./study";

export const CardLearningIntroWindow = manifest(CardLearningIntro, {
  initialTitle: (props) => `Estudo das Cartas - Explicação: ${props.trail.title}`,
  hasAnimation: false,
});

export const CardLearningWindow = manifest(CardLearning, {
  initialTitle: (props) => `Estudo das Cartas: ${props.trail.title}`,
  hasAnimation: false,
});

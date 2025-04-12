import DocumentWhiteoutIntro from ".";
import { manifest } from "../../Lib/compass_navigator";
import DocumentWhiteout from "./document";

export const DocumentWhiteoutIntroWindow = manifest(DocumentWhiteoutIntro, {
  initialTitle: (props) => `Estudo do Documento - Explicação: ${props.trail.title}`,
  hasAnimation: true,
});

export const DocumentWhiteoutWindow = manifest(DocumentWhiteout, {
  initialTitle: (props) => `Estudo do Documento: ${props.trail.title}`,
  hasAnimation: true,
});

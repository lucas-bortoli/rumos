import Welcome from ".";
import { manifest } from "../../Lib/compass_navigator";
import FeedbackForm from "./feedback_form";
import RegisterForm from "./register_form";

export const WelcomeWindow = manifest(Welcome, {
  initialTitle: () => "Bem-vindo ao Rumos!",
  hasAnimation: false,
});

export const FeedbackFormWindow = manifest(FeedbackForm, {
  initialTitle: () => "Formulário de Feedback",
  hasAnimation: false,
});

export const RegisterWindow = manifest(RegisterForm, {
  initialTitle: () => "Formulário de Registro",
  hasAnimation: false,
});

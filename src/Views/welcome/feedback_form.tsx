import { useState } from "react";
import useAlert from "../../Components/AlertDialog";
import Button from "../../Components/Button";
import RadioButton from "../../Components/RadioButton";
import { MultilineTextField } from "../../Components/TextField";
import { cn } from "../../Lib/class_names";
import style from "./style.module.css";
import { useTelemetry } from "../../Lib/telemetry";

export type Satisfaction =
  | "muito_satisfeito"
  | "satisfeito"
  | "neutro"
  | "insatisfeito"
  | "muito_insatisfeito";

const TriIntensity = ["sim", "nao", "neutro"] as const;

export type TriIntensity = (typeof TriIntensity)[number];

interface FeedbackFormProps {
  onSubmit: () => void;
}

export default function FeedbackForm(props: FeedbackFormProps) {
  const [overallSatisfaction, setOverallSatisfaction] = useState<Satisfaction>("neutro");
  const [bugsEncountered, setBugsEncountered] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState(false);
  const [topicSuggestion, setTopicSuggestion] = useState("");

  const [navigationIntuitive, setNavigationIntuitive] = useState<TriIntensity>("neutro");
  const [navigationDifficulty, setNavigationDifficulty] = useState("");
  const [termsClear, setTermsClear] = useState<TriIntensity>("neutro");

  const showAlert = useAlert();
  const pushTelemetry = useTelemetry();

  async function submitFeedback() {
    // Validation (add more as needed)
    if (!overallSatisfaction) {
      return showAlert({
        title: "Erro",
        content: "Por favor, avalie sua satisfação geral.",
        buttons: { ok: "OK" },
      });
    }

    if (navigationIntuitive === "nao" && !navigationDifficulty) {
      return showAlert({
        title: "Erro",
        content: "Por favor, descreva as dificuldades de navegação.",
        buttons: { ok: "OK" },
      });
    }

    console.log("Feedback enviado:", {
      overallSatisfaction,
      bugsEncountered,
      suggestions,
      wouldRecommend,
      navigationIntuitive,
      navigationDifficulty,
      termsClear,
      topicSuggestion,
    } as const);

    pushTelemetry({
      kind: "FeedbackSurvey",
      survey: {
        overallSatisfaction,
        bugsEncountered,
        suggestions,
        wouldRecommend,
        navigationIntuitive,
        navigationDifficulty,
        termsClear,
        topicSuggestion,
      },
    });

    await showAlert({
      title: "Obrigado!",
      content: "Seu feedback é muito importante para nós.",
      buttons: { ok: "OK" },
    });

    props.onSubmit();
  }

  return (
    <div
      className={cn(
        "relative mx-auto flex h-full w-full max-w-[768px] flex-col items-stretch gap-4 overflow-y-scroll p-8",
        style.container
      )}>
      <h1 className="text-2xl">Nos ajude a melhorar!</h1>
      <p>Gostaríamos de saber sua opinião sobre a Rumos.</p>

      <section className="flex w-full flex-col items-stretch gap-2">
        <label className="font-bold">
          Em geral, como você avalia sua experiência com o aplicativo?
        </label>
        <div>
          {(
            [
              ["muito_satisfeito", "Muito satisfeito"],
              ["satisfeito", "Satisfeito"],
              ["neutro", "Neutro"],
              ["insatisfeito", "Insatisfeito"],
              ["muito_insatisfeito", "Muito insatisfeito"],
            ] as [Satisfaction, string][]
          ).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2">
              <RadioButton
                checked={overallSatisfaction === value}
                onCheck={setOverallSatisfaction.bind(null, value)}
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col items-stretch gap-2">
        <label className="font-bold">A navegação no aplicativo foi intuitiva?</label>
        <div>
          {(
            [
              ["sim", "Sim"],
              ["nao", "Não"],
              ["neutro", "Neutro"],
            ] as [TriIntensity, string][]
          ).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2">
              <RadioButton
                checked={navigationIntuitive === value}
                onCheck={setNavigationIntuitive.bind(null, value)}
              />
              {label}
            </label>
          ))}
        </div>
        {navigationIntuitive === "nao" && (
          <MultilineTextField
            className="h-24"
            placeholder="Por favor, descreva as dificuldades que você encontrou ao navegar..."
            onInput={setNavigationDifficulty}
            value={navigationDifficulty}
          />
        )}
      </section>

      <section className="flex w-full flex-col items-stretch gap-2">
        <label className="font-bold">
          Os termos e informações apresentadas foram claros e fáceis de entender?
        </label>
        <div>
          {(
            [
              ["sim", "Sim"],
              ["nao", "Não"],
              ["neutro", "Neutro"],
            ] as [TriIntensity, string][]
          ).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2">
              <RadioButton
                checked={termsClear === value}
                onCheck={setTermsClear.bind(null, value)}
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col items-stretch gap-2">
        <label className="font-bold">Você encontrou algum bug ou problema durante o uso?</label>
        <MultilineTextField
          className="h-24"
          placeholder="Descreva os bugs ou problemas que você encontrou..."
          onInput={setBugsEncountered}
          value={bugsEncountered}
        />
      </section>

      <section className="flex w-full flex-col items-stretch gap-2">
        <label className="font-bold">Você tem alguma sugestão para melhorar o aplicativo?</label>
        <MultilineTextField
          className="h-24"
          placeholder="Compartilhe suas ideias e sugestões..."
          onInput={setSuggestions}
          value={suggestions}
        />
      </section>

      <section className="flex w-full flex-col items-stretch gap-2">
        <label className="font-bold">Você recomendaria este aplicativo para um amigo?</label>
        <div>
          <label className="flex items-center gap-2">
            <RadioButton
              checked={wouldRecommend === true}
              onCheck={setWouldRecommend.bind(null, true)}
            />
            Sim
          </label>
          <label className="flex items-center gap-2">
            <RadioButton
              checked={wouldRecommend === false}
              onCheck={setWouldRecommend.bind(null, false)}
            />
            Não
          </label>
        </div>
      </section>

      <section className="flex w-full flex-col items-stretch gap-2">
        <label className="font-bold">
          Há algum tópico que você gostaria que seja abordado nas versões futuras da plataforma?
        </label>
        <MultilineTextField
          className="h-24"
          placeholder="Alguma sugestão?"
          onInput={setTopicSuggestion}
          value={topicSuggestion}
        />
      </section>

      <Button onClick={submitFeedback}>Enviar Feedback</Button>
    </div>
  );
}

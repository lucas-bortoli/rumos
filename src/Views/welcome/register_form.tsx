import { useEffect, useRef, useState } from "react";
import Button from "../../Components/Button";
import TextField from "../../Components/TextField";
import ComboBox from "../../Components/ComboBox";
import ComboBoxOption from "../../Components/ComboBox/ComboBoxOption";
import Checkbox from "../../Components/Checkbox";
import style from "./style.module.css";
import { cn } from "../../Lib/class_names";
import useAlert from "../../Components/AlertDialog";
import { useGameState } from "../../Game/Data";
import { useWindowing } from "../../Lib/compass_navigator";
import { HomeWindow } from "../main_menu/_windows";
import useMouseVerticalPanScroll from "../../Lib/mouse_scroll_panning/use_mouse_vertical_pan_scroll";

// Função auxiliar para validar o formato do e-mail
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [allowSendingEmail, setAllowSendingEmail] = useState(true);
  const [age, setAge] = useState(13);
  const [gender, setGender] = useState("masculino");
  const [distributionSource, setDistributionSource] = useState("Indicação de amigos");

  const windowing = useWindowing();
  const showAlert = useAlert();
  const game = useGameState();

  async function submit() {
    // Validação do nome
    if (!name) {
      return showAlert({
        title: "Campo Vazio",
        content: "Por favor, preencha o campo nome.",
        buttons: { ok: "OK" },
      });
    }

    // Validação do email
    if (!email) {
      return showAlert({
        title: "Campo Vazio",
        content: "Por favor, preencha o campo e-mail.",
        buttons: { ok: "OK" },
      });
    } else if (!isValidEmail(email)) {
      return showAlert({
        title: "Campo Vazio",
        content: "Por favor, insira um e-mail válido.",
        buttons: { ok: "OK" },
      });
    }

    // Validação da idade
    if (age < 13 || age > 120) {
      return showAlert({
        title: "Campo Vazio",
        content: "Por favor, insira uma idade entre 13 e 120.",
        buttons: { ok: "OK" },
      });
    }

    // Validação do gênero
    if (!gender) {
      return showAlert({
        title: "Campo Vazio",
        content: "Por favor, selecione o seu gênero.",
        buttons: { ok: "OK" },
      });
    }

    // Validação da fonte de distribuição
    if (!distributionSource) {
      return showAlert({
        title: "Campo Vazio",
        content: "Por favor, selecione como você ficou sabendo do aplicativo.",
        buttons: { ok: "OK" },
      });
    }

    await showAlert({
      title: "Obrigado!",
      content: "Os dados nos ajudarão a melhorar o aplicativo cada vez mais.",
      buttons: { ok: "Iniciar" },
    });

    game.dispatch({
      kind: "SetUserInfo",
      info: {
        name,
        age,
        allowSendingEmail,
        email,
        gender,
        distributionSource,
      },
    });
  }

  useEffect(() => {
    if (game.data.userInfo !== null) {
      windowing.windows.forEach((w) => windowing.removeWindow(w.key));
      windowing.createWindow(HomeWindow, {});
    }
  }, [game.data]);

  const mainRef = useRef<HTMLDivElement | null>(null);
  useMouseVerticalPanScroll(mainRef);

  return (
    <div
      ref={mainRef}
      className={cn(
        "relative mx-auto flex h-full w-full max-w-[768px] flex-col items-stretch gap-4 overflow-y-scroll p-8",
        style.container
      )}>
      <h1 className="text-2xl">Antes de tudo...</h1>
      <p>Para fins de teste, por favor, nos ajude com algumas informações!</p>
      <section className="flex w-full flex-col items-stretch">
        <label>Qual o seu nome?</label>
        <TextField
          kind="text"
          placeholder="Digite seu nome completo aqui..."
          onInput={setName}
          value={name}
        />
      </section>
      <section className="flex gap-4">
        <section className="flex grow basis-0 flex-col items-stretch">
          <label>Sua idade</label>
          <div className="relative flex">
            <TextField
              className="w-full grow !pr-18 text-right"
              kind="number"
              placeholder="Sua idade, em anos..."
              onInput={setAge}
              value={age}
              min={13}
              max={120}
              step={1}
            />
            <span className="text-grey-600 absolute top-2 right-8">anos</span>
          </div>
        </section>
        <section className="flex grow basis-0 flex-col items-stretch">
          <label>Seu gênero</label>
          <ComboBox value={gender} onChange={setGender}>
            <ComboBoxOption kind="option" value="masculino">
              Masculino
            </ComboBoxOption>
            <ComboBoxOption kind="option" value="feminino">
              Feminino
            </ComboBoxOption>
          </ComboBox>
        </section>
      </section>
      <section className="flex w-full flex-col items-stretch">
        <label>Qual o seu e-mail?</label>
        <TextField
          kind="text"
          placeholder="Digite seu e-mail aqui..."
          onInput={setEmail}
          value={email}
        />
        <label className="mt-4 flex gap-4">
          <Checkbox checked={allowSendingEmail} onCheck={setAllowSendingEmail} className="mt-1" />
          Estou disposto(a) a receber e-mails futuros sobre o projeto
        </label>
      </section>
      <section className="flex w-full flex-col items-stretch">
        <label>Como você ficou sabendo do aplicativo?</label>
        <ComboBox value={distributionSource} onChange={setDistributionSource}>
          <ComboBoxOption kind="option" value="Indicação de amigos">
            Indicação de amigos
          </ComboBoxOption>
          <ComboBoxOption kind="option" value="Contato com os desenvolvedores">
            Contato com os desenvolvedores
          </ComboBoxOption>
          <ComboBoxOption kind="option" value="Redes sociais / Aplicativos de Mensagem">
            Redes sociais / Aplicativos de Mensagem
          </ComboBoxOption>
          <ComboBoxOption kind="option" value="Anúncios pagos">
            Anúncios pagos
          </ComboBoxOption>
          <ComboBoxOption kind="option" value="Outros">
            Outros
          </ComboBoxOption>
        </ComboBox>
      </section>
      <Button onClick={submit}>Salvar</Button>
    </div>
  );
}

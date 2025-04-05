import { BOSS_QUESTIONS, BossQuestion } from "../../Game/Data/data";
import { addListener, removeListener } from "../../Lib/event_manager";
import { ImperativeObject, notifyUpdate } from "../../Lib/imperative_object";
import { pickRandomUniqueChoices, shuffleArray } from "../../Lib/random";
import generateUUID from "../../Lib/uuid";

interface Opponent {
  name: string;
  hp: number;
  hpMax: number;
  initialDialogue: string[];
  playerVictoryDialogue: string[];
  playerLossDialogue: string[];
}

interface Player {
  name: string;
  hp: number;
  hpMax: number;
}

type BattleState =
  | { kind: "InitialDialog" }
  | { kind: "UserTurn"; question: BossQuestion; choices: BossQuestion["choices"] }
  | { kind: "OpponentTurn" }
  | { kind: "GameOver" }
  | { kind: "Victory" };

type UserAction = { kind: "ClickAnywhere" } | { kind: "CardSubmit"; wasCorrect: boolean };

export default class Battle implements ImperativeObject {
  public readonly uuid: string = generateUUID();
  public readonly player: Player;
  public readonly opponent: Opponent;

  public dialog: string | null;
  public state: BattleState;

  private onWindowClickEventHandler: number | null;

  constructor() {
    this.uuid = generateUUID();
    this.player = {
      name: "User",
      hp: 3,
      hpMax: 3,
    };
    this.opponent = {
      name: "Archie",
      hp: 8,
      hpMax: 8,
      initialDialogue: [
        "Sal sempre dizia: 'Contrato sem clareza é briga na certa'. Vamos ver se você conhece essas palavras tão bem quanto eu.",
        //  "Cada resposta errada vai me deixar... menos paciente. Escolha com sabedoria.",
        //  "O jogo é simples: você responde, eu avalio. Mas não espere misericórdia.",
      ],
      playerVictoryDialogue: [
        "*limpa o sangue do queixo* Tá bom. Você sabe o básico... mas isso não vai te salvar do Vincent.",
        "Até que enfim alguém que leu os contratos. Não comemore ainda - isso foi o fácil.",
        "Sal teria gostado de você. Uma pena que ele não está mais aqui pra ver.",
      ],
      playerLossDialogue: [
        "*joga o contrato no chão* Patético. Nem meu sobrinho de 12 anos erra essas.",
        "Volte quando aprender a ler. Até lá, fique longe dos negócios da família.",
        "*ri baixo* Eu avisei. Agora vai embora antes que eu mude de ideia.",
      ],
    };

    this.state = { kind: "InitialDialog" };
    this.dialog = null;
    this.onWindowClickEventHandler = null;
  }

  onMount() {
    this.onWindowClickEventHandler = addListener(document, "click", () => {
      this.onUserAction({ kind: "ClickAnywhere" });
    });
    this.switchState({ kind: "InitialDialog" });
  }

  switchState(next: BattleState) {
    this.state = next;

    switch (this.state.kind) {
      case "InitialDialog": {
        this.dialog = this.opponent.initialDialogue.at(0)!;
        break;
      }
      case "UserTurn": {
        this.dialog = `É a sua vez.\n${this.state.question.content}`;
        break;
      }
      case "OpponentTurn":
      case "GameOver":
      case "Victory":
        break; // no op
    }

    notifyUpdate(this);
  }

  private pickQuestion() {
    const question = BOSS_QUESTIONS[Math.floor(Math.random() * BOSS_QUESTIONS.length)];
    const choices = shuffleArray(question.choices);

    return { question, choices };
  }

  onUserAction(action: UserAction) {
    console.log(this.state, action);

    switch (this.state.kind) {
      case "UserTurn": {
        if (action.kind === "CardSubmit") {
          if (action.wasCorrect) {
            this.opponent.hp--;
            if (this.opponent.hp < 0) this.opponent.hp = 0;
          } else {
            this.player.hp--;
            if (this.player.hp < 0) this.player.hp = 0;
          }

          const { question, choices } = this.pickQuestion();
          this.switchState({
            kind: "UserTurn",
            question,
            choices,
          });
        }
        break;
      }
      case "InitialDialog": {
        if (action.kind === "ClickAnywhere") {
          if (this.dialog === null) break;

          const nextIdx = this.opponent.initialDialogue.indexOf(this.dialog) + 1;
          const next = this.opponent.initialDialogue[nextIdx] ?? null;

          if (next === null) {
            // end of talk
            const { question, choices } = this.pickQuestion();
            this.switchState({
              kind: "UserTurn",
              question,
              choices,
            });
          } else {
            this.dialog = next;
            notifyUpdate(this);
          }
        }
        break;
      }
      case "OpponentTurn":
      case "GameOver":
      case "Victory":
        break; // no op
    }
  }

  onUnmount() {
    if (this.onWindowClickEventHandler !== null) removeListener(this.onWindowClickEventHandler);
  }
}

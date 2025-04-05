import {
  BOSS_CORRECT_ANSWER_DIALOGUES,
  BOSS_QUESTIONS,
  BOSS_WRONG_ANSWER_DIALOGUES,
  BossQuestion,
} from "../../../Game/Data/data";
import { addListener, removeListener } from "../../../Lib/event_manager";
import { ImperativeObject, notifyUpdate } from "../../../Lib/imperative_object";
import { pickRandomUniqueChoices, shuffleArray } from "../../../Lib/random";
import generateUUID from "../../../Lib/uuid";

export type UserAction = { kind: "ClickAnywhere" } | { kind: "CardSubmit"; wasCorrect: boolean };

export type BattleStateKind = "Dialog" | "UserTurn" | "GameOver" | "Victory";

export interface BattleState {
  readonly kind: BattleStateKind;
  readonly battle: Battle;

  onEnter: () => void;
  onExit: () => void;

  /**
   * Given an user action, mutates internal state.
   * @returns Should the UI be refreshed?
   */
  update: (action: UserAction) => boolean;

  get textBoxContent(): string | null;
}

export class Battle implements ImperativeObject {
  readonly uuid: string = generateUUID();
  state: BattleState | null = null;

  playerName: string = "Player";
  playerHp: number = 3;
  playerHpMax: number = 3;
  opponentName: string = "Archie2";
  opponentHp: number = 3;
  opponentHpMax: number = 3;

  private onWindowClickEventHandler: number | null = null;

  constructor() {
    this.switchState(
      new Dialog(
        this,
        [
          "Sal sempre dizia: 'Contrato sem clareza é briga na certa'. Vamos ver se você conhece essas palavras tão bem quanto eu.",
          "Cada resposta errada vai me deixar... menos paciente. Escolha com sabedoria.",
          "O jogo é simples: você responde, eu avalio. Mas não espere misericórdia.",
        ],
        new UserTurn(this)
      )
    );
  }

  switchState(newState: BattleState | null) {
    this.state?.onExit();
    this.state = newState;
    this.state?.onEnter();
    notifyUpdate(this);
  }

  sendUserAction(action: UserAction) {
    const shouldUpdate = this.state?.update(action);
    if (shouldUpdate) notifyUpdate(this);
  }

  onMount() {
    this.onWindowClickEventHandler = addListener(document, "click", () => {
      this.sendUserAction({ kind: "ClickAnywhere" });
    });
  }

  onUnmount() {
    if (this.onWindowClickEventHandler) {
      removeListener(this.onWindowClickEventHandler);
      this.onWindowClickEventHandler = null;
    }

    this.switchState(null);
  }
}

export class Dialog implements BattleState {
  readonly kind: BattleStateKind = "Dialog";
  readonly battle: Battle;

  private lines: string[];
  private currentIndex: number;
  private nextState: BattleState;

  constructor(battle: Battle, lines: string[], nextState: BattleState) {
    this.battle = battle;
    this.lines = lines;
    this.nextState = nextState;
    this.currentIndex = 0;
  }

  onEnter() {}

  onExit() {}

  update(action: UserAction) {
    if (action.kind === "ClickAnywhere") {
      // advance dialog
      this.currentIndex++;

      if (this.lines.at(this.currentIndex) === undefined) {
        // end of dialog
        this.battle.switchState(this.nextState);
        return false;
      }

      return true;
    }

    return false;
  }

  get textBoxContent(): string | null {
    return this.lines.at(this.currentIndex) ?? null;
  }
}

export class UserTurn implements BattleState {
  readonly kind: BattleStateKind = "UserTurn";
  readonly battle: Battle;

  readonly question: BossQuestion;
  readonly choices: BossQuestion["choices"];

  constructor(battle: Battle) {
    this.battle = battle;

    this.question = BOSS_QUESTIONS[Math.floor(Math.random() * BOSS_QUESTIONS.length)];
    this.choices = shuffleArray(this.question.choices);
  }

  onEnter() {}

  onExit() {}

  update(action: UserAction) {
    if (action.kind === "CardSubmit") {
      if (action.wasCorrect) {
        this.battle.opponentHp--;
        if (this.battle.opponentHp < 0) this.battle.opponentHp = 0;

        const lines = pickRandomUniqueChoices(BOSS_CORRECT_ANSWER_DIALOGUES, 1)[0];
        if (this.battle.opponentHp >= 1) {
          // acertou, mas o boss continua vivo
          this.battle.switchState(new Dialog(this.battle, lines, new UserTurn(this.battle)));
        } else {
          // acertou e matou o boss
          this.battle.switchState(new Dialog(this.battle, lines, new Victory(this.battle)));
        }
      } else {
        this.battle.playerHp--;
        if (this.battle.playerHp < 0) this.battle.playerHp = 0;

        const lines = pickRandomUniqueChoices(BOSS_WRONG_ANSWER_DIALOGUES, 1)[0];
        if (this.battle.playerHp >= 1) {
          // errou, mas o player continua vivo
          this.battle.switchState(new Dialog(this.battle, lines, new UserTurn(this.battle)));
        } else {
          // errou e morreu
          this.battle.switchState(new Dialog(this.battle, lines, new GameOver(this.battle)));
        }
      }

      return true;
    }

    return false;
  }

  get textBoxContent(): string | null {
    return this.question.content;
  }
}

export class GameOver implements BattleState {
  readonly kind: BattleStateKind = "GameOver";
  readonly battle: Battle;

  constructor(battle: Battle) {
    this.battle = battle;
  }

  onEnter() {}

  onExit() {}

  update(action: UserAction) {
    return true;
  }

  get textBoxContent(): string | null {
    return "Você perdeu.";
  }
}

export class Victory implements BattleState {
  readonly kind: BattleStateKind = "Victory";
  readonly battle: Battle;

  constructor(battle: Battle) {
    this.battle = battle;
  }

  onEnter() {}

  onExit() {}

  update(action: UserAction) {
    return true;
  }

  get textBoxContent(): string | null {
    return "Você ganhou!";
  }
}

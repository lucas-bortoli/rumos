import { addListener, removeListener } from "../../Lib/event_manager";
import { ImperativeObject, notifyUpdate } from "../../Lib/imperative_object";
import generateUUID from "../../Lib/uuid";

interface Opponent {
  name: string;
  level: number;
  hp: number;
  hpMax: number;
  initialDialogue: string[];
}

interface Player {
  name: string;
  level: number;
  hp: number;
  hpMax: number;
}

type BattleState = "InitialDialog" | "UserTurn" | "OpponentTurn" | "GameOver" | "Victory";

export default class Battle implements ImperativeObject {
  uuid: string = generateUUID();

  state: BattleState;
  player: Player;
  opponent: Opponent;

  onWindowClickEventHandler: number;

  constructor() {
    this.state = "UserTurn";
    this.player = {
      name: "User",
      level: 10,
      hp: 7,
      hpMax: 8,
    };
    this.opponent = {
      name: "Archie",
      level: 8,
      hp: 3,
      hpMax: 5,
      initialDialogue: ["I like shorts!", "They're comfy and easy to wear!"],
    };

    this.onWindowClickEventHandler = addListener(document, "click", this.onWindowClick.bind(this));
  }

  onWindowClick(event: MouseEvent) {
    //if (this.state === "InitialDialog") {
    this.state = "UserTurn";
    //} else {
    //  this.state = "InitialDialog";
    //}
    notifyUpdate(this);
  }

  onUnmount() {
    removeListener(this.onWindowClickEventHandler);
  }
}

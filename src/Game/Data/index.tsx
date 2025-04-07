import {
  ActionDispatch,
  createContext,
  Dispatch,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { GameState, initialGameState } from "./state";
import { loadFromLocalStorage, saveToLocalStorage } from "./storage";
import { useTelemetry } from "../../Lib/telemetry";

export type Action =
  | {
      kind: "SetUserInfo";
      info: GameState["userInfo"];
    }
  | { kind: "SetUserGaveFeedbackSurvey"; surveyGiven: boolean };

function reducer(previous: GameState, action: Action): GameState {
  switch (action.kind) {
    case "SetUserInfo": {
      return { ...previous, userInfo: action.info };
    }
    case "SetUserGaveFeedbackSurvey": {
      return { ...previous, userGaveFeedback: action.surveyGiven };
    }
  }

  return previous;
}

const context = createContext<{ data: GameState; dispatch: Dispatch<Action> } | null>(null);

export function GameStateProvider(props: PropsWithChildren) {
  const [data, dispatch] = useReducer(reducer, initialGameState, loadFromLocalStorage);

  useEffect(() => {
    saveToLocalStorage(data); // this is debounced so it's fine to call it immediately
  }, [data]);

  const pushTelemetry = useTelemetry();
  const wiretappedDispatch: ActionDispatch<[action: Action]> = useCallback(
    (action: Action) => {
      pushTelemetry({ kind: "GameStateDispatchAction", action });
      dispatch(action);
    },
    [dispatch, pushTelemetry]
  );

  return (
    <context.Provider value={{ data, dispatch: wiretappedDispatch }}>
      {props.children}
    </context.Provider>
  );
}

export function useGameState() {
  const data = useContext(context);
  if (data === null) throw new Error("This must be used within a <GameStateProvider />.");
  return data;
}

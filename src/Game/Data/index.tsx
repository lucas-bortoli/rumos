import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { GameState, initialGameState } from "./state";
import { loadFromLocalStorage, saveToLocalStorage } from "./storage";

type Action = {};

function reducer(previous: GameState, action: Action): GameState {
  return previous;
}

const context = createContext<{ data: GameState; dispatch: Dispatch<Action> } | null>(null);

export function GameStateProvider(props: PropsWithChildren) {
  const [data, dispatch] = useReducer(reducer, initialGameState, loadFromLocalStorage);

  useEffect(() => {
    saveToLocalStorage(data); // this is debounced so it's fine to call it immediately
  }, [data]);

  return <context.Provider value={{ data, dispatch }}>{props.children}</context.Provider>;
}

export function useGameState() {
  const data = useContext(context);
  if (data === null) throw new Error("This must be used within a <GameStateProvider />.");
  return data;
}

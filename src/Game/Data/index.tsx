import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { GameData, initialGameData } from "./data";
import { loadFromLocalStorage, saveToLocalStorage } from "./storage";

type Action = {};

function reducer(previous: GameData, action: Action): GameData {
  return previous;
}

const context = createContext<{ data: GameData; dispatch: Dispatch<Action> } | null>(null);

export function GameDataProvider(props: PropsWithChildren) {
  const [data, dispatch] = useReducer(reducer, initialGameData, loadFromLocalStorage);

  useEffect(() => {
    saveToLocalStorage(data); // this is debounced so it's fine to call it immediately
  }, [data]);

  return <context.Provider value={{ data, dispatch }}>{props.children}</context.Provider>;
}

export function useGameData() {
  const data = useContext(context);
  if (data === null) throw new Error("This must be used within a <GameDataProvider />.");
  return data;
}

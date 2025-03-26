import { createContext, PropsWithChildren, useContext } from "react";
import { WindowKey } from "..";

const context = createContext<WindowKey | null>(null);

interface CurrentWindowKeyProviderProps extends PropsWithChildren {
  windowKey: WindowKey;
}

export function CurrentWindowKeyProvider(props: CurrentWindowKeyProviderProps) {
  return <context.Provider value={props.windowKey}>{props.children}</context.Provider>;
}

export default function useCurrentWindowKey() {
  const currentKey = useContext(context);

  if (currentKey === null) {
    throw new Error("This must be used within a <WindowContainer />.");
  }

  return currentKey;
}

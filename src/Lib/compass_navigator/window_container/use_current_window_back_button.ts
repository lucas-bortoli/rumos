import { useRef } from "react";
import { useWindowing } from "..";
import { useBackButtonHandler } from "../../back_button";
import useCurrentWindowKey from "./current_window_key_context";

export default function useCurrentWindowBackButton(callback: () => void) {
  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useBackButtonHandler(() => {
    if (windowing.windows.at(-1)?.key === currentWindowKey) {
      callbackRef.current();
    }
  });
}

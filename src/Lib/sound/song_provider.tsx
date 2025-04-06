import MusShop from "./mus_shop.mp3";
import MusSuspense from "./mus_suspense.mp3";
import MusBattleVictory from "./mus_battle_victory.mp3";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowing, WindowKey } from "../compass_navigator";
import { uniqBy } from "lodash-es";
import useCurrentWindowKey from "../compass_navigator/window_container/current_window_key_context";

function fadeOut(
  audio: HTMLAudioElement | null,
  duration: number = 1000,
  onDone?: (sound: HTMLAudioElement) => void
) {
  if (!audio) return;

  const initialVolume = audio.volume;
  const startTime = performance.now();

  const fadeOutStep = (currentTime: number) => {
    if (!audio) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    audio.volume = Math.min(Math.max(0, initialVolume * (1 - progress)), 1);

    if (progress < 1) {
      requestAnimationFrame(fadeOutStep);
    } else {
      onDone?.(audio);
    }
  };

  requestAnimationFrame(fadeOutStep);
}

export const Songs = {
  MusSuspense: MusSuspense,
  MusShop: MusShop,
  MusBattleVictory,
} as const;

export type SongName = keyof typeof Songs;

interface WindowSong {
  ownerWindow: WindowKey;
  name: SongName;
  volume?: number;
}

const context = createContext<[WindowSong[], Dispatch<SetStateAction<WindowSong[]>>] | null>(null);
export function SongProvider(props: PropsWithChildren) {
  const [songs, setSongs] = useState<WindowSong[]>([]);
  const windowing = useWindowing();

  const soundElement = useRef<HTMLAudioElement | null>(null);

  const sMap = new Map(songs.map((s) => [s.ownerWindow, s])) as ReadonlyMap<WindowKey, WindowSong>;
  const songZOrder: WindowSong[] = uniqBy(
    windowing.windows
      .map((w) => sMap.get(w.key))
      .filter((s) => !!s)
      .toReversed(),
    (w) => w.ownerWindow
  ).toReversed();

  const topmostSong = songZOrder.at(-1) ?? null;

  console.log(songZOrder);

  useEffect(() => {
    if (!topmostSong) return;

    soundElement.current = document.createElement("audio");

    soundElement.current.src = Songs[topmostSong.name];
    soundElement.current.style.display = "none";
    soundElement.current.preload = "auto";
    soundElement.current.loop = true;
    soundElement.current.autoplay = true;
    soundElement.current.volume = topmostSong.volume ?? 1.0;

    return () => {
      fadeOut(soundElement.current, 1000, (audio) => {
        audio.pause();
        audio.currentTime = 0;
        audio.remove();
      });
      soundElement.current = null;
    };
  }, [topmostSong]);

  useEffect(() => {
    if (topmostSong && soundElement.current) {
      soundElement.current.volume = topmostSong.volume ?? 1.0;
    }
  }, [topmostSong?.volume]);

  return <context.Provider value={[songs, setSongs]}>{props.children}</context.Provider>;
}

interface UseSongOptions {
  name: SongName | null;
  volume?: number;
}

export function useBackgroundSong(options: UseSongOptions) {
  const songContext = useContext(context);
  const currentWindowKey = useCurrentWindowKey();

  if (!songContext) throw new Error("This must be used within a <SongProvider />.");

  const [, setSongs] = songContext;

  useEffect(() => {
    setSongs((songs) => {
      const withoutCurrentWindow = songs.filter((s) => s.ownerWindow !== currentWindowKey);
      return [
        ...withoutCurrentWindow,
        options.name
          ? {
              ownerWindow: currentWindowKey,
              name: options.name,
              volume: options.volume,
            }
          : null,
      ].filter((t) => t !== null);
    });
  }, [currentWindowKey, options.name, options.volume]);
}

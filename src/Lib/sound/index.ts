import { useCallback, useEffect, useRef } from "react";
import SndButton1 from "./snd_button1.mp3";
import SndButton2 from "./snd_button2.mp3";
import SndCards from "./snd_cards.mp3";
import SndCards2 from "./snd_cards2.mp3";
import SndDamage from "./snd_damage.mp3";
import SndLogo from "./snd_logo.mp3";

export const Sounds = {
  SndButton1,
  SndButton2,
  SndCards,
  SndCards2,
  SndDamage,
  SndLogo,
} as const;

export type SoundName = keyof typeof Sounds;

interface SoundOptions {
  name: SoundName;
  volume?: number;
  loop?: boolean;
  autoPlay?: boolean;
}

export default function useSound(options: SoundOptions) {
  const soundElement = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    soundElement.current = document.createElement("audio");

    soundElement.current.src = Sounds[options.name];
    soundElement.current.style.display = "none";
    soundElement.current.preload = "auto";

    return () => {
      if (soundElement.current) {
        soundElement.current.pause();
        soundElement.current.currentTime = 0;
        soundElement.current.remove();
      }
      soundElement.current = null;
    };
  }, [options.name]);

  useEffect(() => {
    if (soundElement.current) {
      soundElement.current.volume = options.volume ?? 1.0;
      soundElement.current.loop = options.loop ?? false;
      soundElement.current.autoplay = options.autoPlay ?? false;
    }
  }, [options.volume, options.loop, options.autoPlay]);

  return useCallback(function play() {
    if (soundElement.current) {
      soundElement.current.currentTime = 0;
      soundElement.current.play();
    }
  }, []);
}

import { useCallback, useEffect, useRef } from "react";
import MusShop from "./mus_shop.mp3";
import MusSuspense from "./mus_suspense.mp3";
import SndButton1 from "./snd_button1.mp3";
import SndButton2 from "./snd_button2.mp3";
import SndCards from "./snd_cards.mp3";
import SndCards2 from "./snd_cards2.mp3";
import SndDamage from "./snd_damage.mp3";
import SndLogo from "./snd_logo.mp3";

const Sounds = {
  MusSuspense: MusSuspense,
  MusShop: MusShop,
  SndButton1,
  SndButton2,
  SndCards,
  SndCards2,
  SndDamage,
  SndLogo,
} as const;

export type SoundName = keyof typeof Sounds;

function fadeOut(audio: HTMLAudioElement | null, duration: number = 1000) {
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
      audio.pause();
      audio.currentTime = 0;
      audio.remove();
    }
  };

  requestAnimationFrame(fadeOutStep);
}

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
      fadeOut(soundElement.current, 1000);
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

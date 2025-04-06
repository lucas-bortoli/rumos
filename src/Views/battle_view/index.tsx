import { Key, useEffect, useLayoutEffect } from "react";
import Frame from "../../Components/Frame";
import SpriteIcon from "../../Components/SpriteIcon";
import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import useImperativeObject from "../../Lib/imperative_object";
import Run from "../../Lib/run";
import useSound from "../../Lib/sound";
import CurvedCards from "./Components/curved_cards";
import HealthBar from "./Components/health_bar";
import { Battle, GameOver, UserTurn, Victory } from "./Logic";
import style from "./style.module.css";
import useScrollingText from "./Hooks/use_scrolling_text";
import useStateEffect from "./Hooks/use_state_effect";
import ZoomedCard from "./Components/zoomed_card";
import useAlert from "../../Components/AlertDialog";
import { BOSS_NAME } from "../../Game/Data/data";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import { useBackButton } from "../../Lib/back_button";

interface BattleViewProps {}

export default function BattleView(props: BattleViewProps) {
  const battle = useImperativeObject(() => new Battle());
  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();
  const showAlert = useAlert();
  const playCard1Sound = useSound({ name: "SndCards" });
  const playCard2Sound = useSound({ name: "SndCards2" });
  const playDamageSound = useSound({ name: "SndDamage", volume: 0.6 });

  useSound({
    name: "MusSuspense",
    volume: 0.5,
    loop: true,
    autoPlay: true,
  });

  useLayoutEffect(() => {
    let t = setTimeout(() => {
      battle.onMount();
    }, 250);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    console.log(battle.state?.kind);
  }, [battle.state]);

  function zoomOnCard(cardKey: Key) {
    if (battle.state?.kind !== "UserTurn") return;
    const currentState = battle.state as UserTurn;
    const isHintCard = cardKey === "HintCard";

    if (isHintCard) {
      playCard1Sound();
      windowing.createWindow({
        title: "Zoomed Hint Card",
        component: ZoomedCard,
        props: {
          cardContent: currentState.question.tip,
          isHintCard: true,
          onSubmit: playCard2Sound,
          onCancel: playCard2Sound,
        },
        backButton: false,
        noAnimation: true,
      });
    } else {
      const card = currentState.choices.find((c) => c.content === cardKey);
      if (!card) return;
      playCard1Sound();
      windowing.createWindow({
        title: "Zoomed Card",
        component: ZoomedCard,
        props: {
          cardContent: card.content,
          isHintCard: false,
          onSubmit: () => {
            playCard2Sound();
            battle.sendUserAction({ kind: "CardSubmit", wasCorrect: card.isCorrect });
          },
          onCancel: playCard2Sound,
        },
        backButton: false,
        noAnimation: true,
      });
    }
  }

  useStateEffect(
    ([currentPlayerHp, currentBossHp], [previousPlayerHp, previousBossHp]) => {
      if (currentPlayerHp < previousPlayerHp) {
        console.log("player harmed");
        playDamageSound();

        // shake screen HERE
      } else {
        console.log("player not harmed");
      }

      if (currentBossHp < previousBossHp) {
        console.log("boss harmed");
        playDamageSound();
      } else {
        console.log("boss not harmed");
      }
    },
    [battle.playerHp, battle.opponentHp] as const
  );

  useEffect(() => {
    Run(async () => {
      const state = battle.state;
      if (state instanceof Victory) {
        await showAlert({
          title: "Parabéns!",
          content: <p>Você venceu o duelo contra {BOSS_NAME}.</p>,
          buttons: { ok: "OK" },
        });
        windowing.removeSpecificWindow(currentWindowKey);
      } else if (state instanceof GameOver) {
        await showAlert({
          title: "Sem vidas!",
          content: <p>Você perdeu o duelo contra {BOSS_NAME}.</p>,
          buttons: { ok: "OK" },
        });
        windowing.removeSpecificWindow(currentWindowKey);
      }
    });
  }, [battle.state]);

  useBackButton(async () => {
    if (windowing.windows.at(-1)?.key !== currentWindowKey) return;

    const choice = await showAlert({
      title: "Desistir do duelo?",
      content: <p>Deseja mesmo desistir do duelo?</p>,
      buttons: { cancel: "Não", confirm: "Desistir" },
    });
    if (choice === "cancel") return;
    setTimeout(() => {
      windowing.removeSpecificWindow(currentWindowKey);
    }, 300);
  });

  const visibleDialog = useScrollingText(battle.state?.textBoxContent ?? "...", 8);

  return (
    <div
      className={cn(
        "bg-grey-800 relative flex h-full w-full flex-col overflow-hidden",
        style.container
      )}
      style={{
        animationPlayState: Run(() => {
          if (
            battle.state === null ||
            battle.state instanceof Victory ||
            battle.state instanceof GameOver
          ) {
            return "paused";
          }
          return "running";
        }),
      }}>
      <Frame className="mx-4 mt-4 h-36">{visibleDialog}</Frame>
      <footer className="mt-2 flex flex-row-reverse justify-between px-4">
        <span className="font-bold text-gray-100">{battle.opponentName}</span>
        <HealthBar hp={battle.opponentHp} hpMax={battle.opponentHpMax} />
      </footer>
      <section className="absolute top-0 left-0 inline-block h-full w-full">
        <SpriteIcon
          name="Archie128"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ height: 256 }}
        />
      </section>
      {Run(() => {
        const state = battle.state;

        if (state instanceof UserTurn)
          return (
            <CurvedCards
              key="curved"
              onCardClick={zoomOnCard}
              className="absolute bottom-12"
              cards={state.choices.map((choice) => ({
                key: choice.content,
                title: choice.content,
              }))}
            />
          );
      })}
      <footer className="absolute bottom-4 flex w-full justify-between px-4">
        <span className="font-bold text-gray-100">{battle.playerName}</span>
        <HealthBar hp={battle.playerHp} hpMax={battle.playerHpMax} />
      </footer>
    </div>
  );
}

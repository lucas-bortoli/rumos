import { useEffect, useLayoutEffect } from "react";
import Frame from "../../Components/Frame";
import SpriteIcon from "../../Components/SpriteIcon";
import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import useImperativeObject from "../../Lib/imperative_object";
import Run from "../../Lib/run";
import useSound from "../../Lib/sound";
import Battle from "./battle";
import CurvedCards from "./curved_cards";
import HealthBar from "./health_bar";
import style from "./style.module.css";
import useScrollingText from "./use_scrolling_text";
import ZoomedCard from "./zoomed_card";

interface BattleViewProps {}

export default function BattleView(props: BattleViewProps) {
  const battle = useImperativeObject(() => new Battle());
  const windowing = useWindowing();

  const soundBgm = useSound({
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
    console.log(battle.state);
  }, [battle.state]);

  function zoomOnCard() {
    windowing.createWindow({
      title: "Zoomed Card",
      component: ZoomedCard,
      props: {
        onSubmit: () => {
          battle.onUserAction({ kind: "CardSubmit" });
        },
        onCancel: () => {},
      },
      backButton: false,
      noAnimation: true,
    });
  }

  const visibleDialog = useScrollingText(battle.dialog ?? "...", 18);

  return (
    <div
      className={cn(
        "bg-grey-800 relative flex h-full w-full flex-col overflow-hidden",
        style.container
      )}>
      <Frame className="mx-4 mt-4 h-36">{visibleDialog}</Frame>
      <footer className="mt-2 flex flex-row-reverse justify-between px-4">
        <span className="font-bold text-gray-100">{battle.opponent.name}</span>
        <HealthBar hp={battle.opponent.hp} hpMax={battle.opponent.hpMax} />
      </footer>
      <section className="absolute top-0 left-0 inline-block h-full w-full">
        <SpriteIcon
          name="Archie128"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ height: 256 }}
        />
      </section>
      {Run(() => {
        switch (battle.state.kind) {
          case "UserTurn":
            return (
              <CurvedCards
                key="curved"
                onCardClick={zoomOnCard}
                className="absolute bottom-12"
                cards={battle.state.choices.map((term) => ({ key: term.id, title: term.term }))}
              />
            );
        }
      })}
      <footer className="absolute bottom-4 flex w-full justify-between px-4">
        <span className="font-bold text-gray-100">{battle.player.name}</span>
        <HealthBar hp={battle.player.hp} hpMax={battle.player.hpMax} />
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import Frame from "../../Components/Frame";
import SpriteIcon from "../../Components/SpriteIcon";
import { useWindowing } from "../../Lib/compass_navigator";
import { addListener, removeListener } from "../../Lib/event_manager";
import useImperativeObject from "../../Lib/imperative_object";
import Run from "../../Lib/run";
import Battle from "./battle";
import CurvedCards from "./curved_cards";
import HealthBar from "./health_bar";
import ZoomedCard from "./zoomed_card";

interface BattleViewProps {}

export default function BattleView(props: BattleViewProps) {
  const battle = useImperativeObject(() => new Battle());
  const windowing = useWindowing();

  const [cardZoom, setCardZoom] = useState(false);

  useEffect(() => {
    const handle = addListener<MouseEvent>(document, "click", (event) => {
      setCardZoom((z) => !z);
    });

    return () => removeListener(handle);
  }, []);

  function zoomOnCard() {
    windowing.createWindow({
      title: "Zoomed Card",
      component: ZoomedCard,
      props: {
        onSubmit: () => {},
        onCancel: () => {},
      },
      backButton: false,
      noAnimation: true,
    });
  }

  return (
    <div className="bg-grey-800 relative flex h-full w-full flex-col overflow-hidden">
      <Frame className="mx-4 mt-4 h-36">Hello</Frame>
      <footer className="mt-2 flex flex-row-reverse justify-between px-4">
        <span className="font-bold text-gray-100">
          {battle.opponent.name}, LV {battle.opponent.level}
        </span>
        <HealthBar hp={battle.opponent.hp} hpMax={battle.opponent.hpMax} />
      </footer>
      <section className="relative my-4 inline-block w-full shrink grow">
        <SpriteIcon
          name="Archie128"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </section>
      {Run(() => {
        switch (battle.state) {
          case "UserTurn":
            return <CurvedCards key="curved" onCardClick={zoomOnCard} />;
          default:
            return <div key="placeholder" className="-mt-24 h-72 pt-24" />;
        }
      })}
      <footer className="mb-4 flex justify-between px-4">
        <span className="font-bold text-gray-100">
          {battle.player.name}, LV {battle.player.level}
        </span>
        <HealthBar hp={battle.player.hp} hpMax={battle.player.hpMax} />
      </footer>
    </div>
  );
}

import Frame from "../../Components/Frame";
import SpriteIcon from "../../Components/SpriteIcon";
import CurvedCards from "./curved_cards";

interface BattleViewProps {}

export default function BattleView(props: BattleViewProps) {
  return (
    <div className="bg-grey-800 relative flex h-full w-full flex-col overflow-hidden">
      <Frame className="mx-4 mt-4 h-36">Hello 1234</Frame>
      <section className="bg-grey-700 relative inline-block w-full shrink grow">
        <SpriteIcon
          name="Archie128"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </section>
      <CurvedCards />
      <footer className="mb-4 flex justify-between px-4">
        <span className="font-bold text-gray-100">Usuário, LV 10</span>
        <div className="flex gap-px">
          <SpriteIcon name="Heart24" />
          <SpriteIcon name="Heart24" />
          <SpriteIcon name="Heart24" />
          <SpriteIcon name="Heart24" />
          <SpriteIcon name="HeartLost24" />
        </div>
      </footer>
    </div>
  );
}

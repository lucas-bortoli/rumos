import SpriteIcon from "../../../Components/SpriteIcon";

export default function HealthBar(props: { hp: number; hpMax: number }) {
  const hearts: boolean[] = [];
  for (let hp = 1; hp <= props.hpMax; hp++) {
    hearts.push(hp <= props.hp ? true : false);
  }

  const heartsElements = hearts.map((b, i) =>
    b ? <SpriteIcon key={i} name="Heart24" /> : <SpriteIcon key={i} name="HeartLost24" />
  );

  return <div className="flex gap-px">{heartsElements}</div>;
}

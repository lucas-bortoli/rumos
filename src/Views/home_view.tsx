import Frame from "../Components/Frame";
import { useCompass } from "../Lib/compass_navigator";

export default function HomeView() {
  const compass = useCompass();

  return (
    <main id="wtf" className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white">
      <nav className="sticky top-0 flex items-center gap-2 bg-white p-4">
        <h1 className="text-2xl">Home</h1>
      </nav>
      <Frame className="m-4 flex flex-col items-stretch gap-2 p-2">
        <h1 className="text-center text-xl font-semibold">Olá, mundo</h1>
        <p>Seja bem-vindo ao Rumos!</p>
        <footer className="flex gap-2">
          <button className="bg-grey-300 shadow-pixel-sm border-grey-800 grow basis-0 border p-2">
            Cancelar
          </button>
          <button className="bg-grey-300 shadow-pixel-sm border-grey-800 grow basis-0 border p-2">
            Confirmar
          </button>
        </footer>
      </Frame>
      {[1, 2, 3].map((k) => (
        <section className="flex flex-col py-2" key={k}>
          <h2 className="px-4 text-xl">Trilha {k}</h2>
          <ul className="flex h-64 w-full overflow-x-scroll pb-1 before:mr-4 after:ml-4">
            {[1, 2, 3, 4].map((i) => (
              <li
                key={i}
                className="shadow-pixel-sm mr-2 aspect-[3/4] h-full bg-amber-100 p-2"></li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

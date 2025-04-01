import { useEffect } from "react";
import useAlert from "../../Components/AlertDialog";

export default function QAView() {
  const showAlert = useAlert();

  useEffect(() => {
    showAlert({
      title: "Seja bem-vindo(a) ao Rumos!",
      content: <p>Para começarmos, nos diga como você se chama.</p>,
      buttons: {
        cancel: "Cancelar",
        ok: "OK",
      },
    });
  }, []);

  return (
    <main className="relative h-full w-full overflow-hidden bg-white">
      <nav className="sticky top-0 z-10 my-8 flex items-center gap-2 border-b border-gray-200 bg-white p-4">
        <h1 className="text-xl">QA</h1>
      </nav>
    </main>
  );
}

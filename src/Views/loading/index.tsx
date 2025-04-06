import { useState } from "react";
import Button from "../../Components/Button";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";

export default function LoadingView() {
  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();

  const [loaded, setLoaded] = useState(false);

  function goToNext() {
    //windowing.createWindow({});
    windowing.removeSpecificWindow(currentWindowKey);
  }

  return (
    <div className="flex h-full w-full flex-col items-stretch gap-2 bg-white p-8">
      <p>Carregando...</p>
      <div className="bg-grey-700 relative h-6 w-full">
        <div className="absolute top-0 left-0 h-full w-[30%] bg-cyan-600" />
      </div>
    </div>
  );
}

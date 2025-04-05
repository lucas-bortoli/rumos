import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import HomeView from "../../Views/home_view";
import MarketplaceView from "../../Views/marketplace_view";
import SvgIcon, { SvgIconName } from "../SvgIcon";

type Screen = "Home" | "Marketplace" | "Quests";

interface NavigationBarBottomProps {
  currentScreen: Screen | null;
}

export default function NavigationBarBottom(props: NavigationBarBottomProps) {
  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();

  function goTo(screen: Screen) {
    switch (screen) {
      case "Home":
        windowing.createWindow({
          component: HomeView,
          props: {},
          title: "Minhas Trilhas",
          noAnimation: true,
        });
        break;
      case "Marketplace":
        windowing.createWindow({
          component: MarketplaceView,
          props: {},
          title: "Marketplace",
          noAnimation: true,
        });
        break;
      default:
        return;
    }

    windowing.removeSpecificWindow(currentWindowKey);
  }

  return (
    <footer className="bg-grey-100 border-grey-200 fixed bottom-0 left-0 z-10 flex w-full items-center border-t px-16 py-4">
      <div className="text-grey-400 flex h-12 w-full items-center justify-between">
        {(
          [
            ["Marketplace", "Explore"],
            ["Home", "AccountCircle"],
            ["Quests", "HotelClass"],
          ] satisfies [Screen, SvgIconName][]
        ).map(([screen, icon]) => {
          return (
            <div key={screen} onClick={() => goTo(screen)} className="h-full">
              <SvgIcon
                icon={icon}
                className={cn(screen === props.currentScreen && "text-lime-600")}
              />
            </div>
          );
        })}
      </div>
    </footer>
  );
}

import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import useCurrentWindowKey from "../../Lib/compass_navigator/window_container/current_window_key_context";
import {
  HomeWindow,
  MarketplaceWindow,
  QuestsWindow,
  FeedbackTabWindow,
} from "../../Views/main_menu/_windows";
import SvgIcon, { SvgIconName } from "../SvgIcon";

type Screen = "Home" | "Marketplace" | "Quests" | "Feedback";

interface NavigationBarBottomProps {
  currentScreen: Screen | null;
}

export default function NavigationBarBottom(props: NavigationBarBottomProps) {
  const windowing = useWindowing();
  const currentWindowKey = useCurrentWindowKey();

  function goTo(screen: Screen) {
    if (props.currentScreen === screen) return; // noop

    switch (screen) {
      case "Home":
        windowing.createWindow(HomeWindow, {});
        break;
      case "Marketplace":
        windowing.createWindow(MarketplaceWindow, {});
        break;
      case "Quests":
        windowing.createWindow(QuestsWindow, {});
        break;
      case "Feedback":
        windowing.createWindow(FeedbackTabWindow, {});
        break;
      default:
        return;
    }

    windowing.removeWindow(currentWindowKey);
  }

  return (
    <footer className="bg-grey-100 border-grey-200 fixed bottom-0 left-0 z-10 flex w-full items-center border-t px-8 py-4">
      <div className="text-grey-400 flex h-12 w-full items-center justify-between">
        {(
          [
            ["Marketplace", "Storefront"],
            ["Home", "ForYou"],
            ["Quests", "HotelClass"],
            ["Feedback", "VolunteerActivism"],
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

import { useEffect, useState } from "react";

export const useKeyboardActive = () => {
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.Telegram?.WebApp) {
      return;
    }

    const { webApp } = window.Telegram.WebApp;
    const defaultViewPort = webApp?.viewportStableHeight;
    const viewportChanged = ({ isStateStable }: { isStateStable: boolean }) => {
      if (
        !defaultViewPort ||
        !webApp?.viewportStableHeight ||
        !isStateStable ||
        webApp?.viewportStableHeight < 100
      ) {
        return;
      }
      if (defaultViewPort > webApp?.viewportStableHeight) {
        setIsKeyboardActive(true);
      } else {
        setIsKeyboardActive(false);
      }
    };
    webApp?.onEvent("viewportChanged", viewportChanged);
    return () => webApp?.offEvent("viewportChanged", viewportChanged);
  }, []);

  return isKeyboardActive;
};

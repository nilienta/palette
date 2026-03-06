import { useEffect, useState } from "react";
import { useTelegram } from "~/shared/providers/TelegramProvider";

export const useKeyboardActive = () => {
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const { isReady, webApp } = useTelegram();

  useEffect(() => {
    if (!isReady || !webApp) {
      return;
    }

    const defaultViewPort = webApp.viewportStableHeight;

    const viewportChanged = ({ isStateStable }: { isStateStable: boolean }) => {
      if (!defaultViewPort || !webApp.viewportStableHeight || !isStateStable) {
        return;
      }
      const isActive = defaultViewPort > webApp.viewportStableHeight;
      setIsKeyboardActive(isActive);
    };

    webApp.onEvent("viewportChanged", viewportChanged);

    return () => {
      webApp.offEvent("viewportChanged", viewportChanged);
    };
  }, [isReady, webApp]);

  return isKeyboardActive;
};

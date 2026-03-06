import { useEffect } from "react";
import { useTelegram } from "../providers/TelegramProvider";

export const useTelegramBackButton = () => {
  const { isReady, webApp } = useTelegram();
  useEffect(() => {
    // Защита от SSR
    if (typeof window === "undefined") {
      return;
    }

    if (webApp && isReady) {
      webApp.BackButton.show();

      const handleBackClick = () => {
        window.history.back();
      };

      webApp.onEvent("backButtonClicked", handleBackClick);

      // Скрываем кнопку при размонтировании
      return () => {
        webApp.BackButton.hide();
        webApp.offEvent("backButtonClicked", handleBackClick);
      };
    }
  }, []);
};

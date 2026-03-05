import { useEffect } from "react";

export const useTelegramBackButton = () => {
  useEffect(() => {
    // Защита от SSR
    if (typeof window === "undefined") {
      return;
    }

    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
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

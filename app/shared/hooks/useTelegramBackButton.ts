import { useEffect } from "react";

export const useTelegramBackButton = () => {
  useEffect(() => {
    // Защита от SSR
    if (typeof window === "undefined") {
      return;
    }

    // Проверяем наличие Telegram WebApp
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.BackButton.show();

      // Добавляем обработчик нажатия
      const handleBackClick = () => {
        console.log("Нажата кнопка назад");
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

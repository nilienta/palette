import { useEffect, useState } from "react";

export const useKeyboardActive = () => {
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [isTelegramReady, setIsTelegramReady] = useState(false);

  useEffect(() => {
    console.log("window.Telegram:", window.Telegram);
    console.log("window.Telegram?.WebApp:", window.Telegram?.WebApp);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Функция проверки готовности Telegram
    const checkTelegram = () => {
      if (window.Telegram?.WebApp) {
        console.log("✅ Telegram WebApp загружен:", window.Telegram.WebApp);
        setIsTelegramReady(true);
        return true;
      }
      return false;
    };

    // Если уже загружен
    if (checkTelegram()) return;

    // Ожидаем загрузки
    console.log("⏳ Ожидание Telegram WebApp...");

    const interval = setInterval(() => {
      if (checkTelegram()) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isTelegramReady) return;

    console.log("🎯 Настройка обработчика клавиатуры");

    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;

    const defaultViewPort = webApp.viewportStableHeight;
    console.log("📏 defaultViewPort:", defaultViewPort);

    const viewportChanged = ({ isStateStable }: { isStateStable: boolean }) => {
      console.log("📱 viewportChanged:", {
        isStateStable,
        height: webApp.viewportStableHeight,
        defaultViewPort,
      });

      if (!defaultViewPort || !webApp.viewportStableHeight || !isStateStable) {
        return;
      }

      const isActive = defaultViewPort > webApp.viewportStableHeight;
      console.log("🎹 Клавиатура:", isActive ? "активна" : "скрыта");
      setIsKeyboardActive(isActive);
    };

    webApp.onEvent("viewportChanged", viewportChanged);

    return () => {
      webApp.offEvent("viewportChanged", viewportChanged);
    };
  }, [isTelegramReady]);

  return isKeyboardActive;
};

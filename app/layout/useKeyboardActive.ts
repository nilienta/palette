import { useEffect, useState } from "react";

export const useKeyboardActive = () => {
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Мок для тестирования на компьютере
    if (!window.Telegram?.WebApp) {
      console.log("⚠️ Telegram WebApp не найден. Используется тестовый режим.");

      // Создаем тестовые кнопки в консоли
      (window as any).__testKeyboard = {
        open: () => setIsKeyboardActive(true),
        close: () => setIsKeyboardActive(false),
        toggle: () => setIsKeyboardActive((prev) => !prev),
      };

      console.log("🔧 Тестовые команды:");
      console.log("  window.__testKeyboard.open() - открыть клавиатуру");
      console.log("  window.__testKeyboard.close() - закрыть клавиатуру");
      console.log("  window.__testKeyboard.toggle() - переключить");

      return;
    }

    // Оригинальная логика для Telegram
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
      setIsKeyboardActive(defaultViewPort > webApp?.viewportStableHeight);
    };

    webApp?.onEvent("viewportChanged", viewportChanged);
    return () => webApp?.offEvent("viewportChanged", viewportChanged);
  }, []);

  return isKeyboardActive;
};

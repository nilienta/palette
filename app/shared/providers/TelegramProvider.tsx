import React, { createContext, useContext, useEffect, useState } from "react";

type TelegramContextType = {
  isReady: boolean;
  webApp: any;
};

const TelegramContext = createContext<TelegramContextType>({
  isReady: false,
  webApp: null,
});

export const useTelegram = () => useContext(TelegramContext);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [isTelegramReady, setIsTelegramReady] = useState(false);
  const [webApp, setWebApp] = useState<any>(null);

  useEffect(() => {
    const isBrowser =
      typeof window !== "undefined" && typeof document !== "undefined";

    if (!isBrowser) {
      return;
    }

    const loadTelegramSDK = () => {
      try {
        // Проверяем, не загружен ли уже скрипт
        if (document.querySelector('script[src*="telegram-web-app"]')) {
          // Проверяем, инициализирован ли WebApp
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
            setWebApp(window.Telegram.WebApp);
            setIsTelegramReady(true);
          }
          return;
        }

        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js?60";
        script.async = true;

        script.onload = () => {
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
            setWebApp(window.Telegram.WebApp);
            setIsTelegramReady(true);
          }
        };

        script.onerror = () => {
          console.error("❌ Ошибка загрузки Telegram SDK");
        };

        document.head.appendChild(script);
      } catch (e) {
        console.error("❌ Ошибка:", e);
      }
    };

    // Загружаем после полной загрузки страницы
    if (document.readyState === "complete") {
      loadTelegramSDK();
    } else {
      window.addEventListener("load", loadTelegramSDK);
      return () => window.removeEventListener("load", loadTelegramSDK);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ isReady: isTelegramReady, webApp }}>
      {children}
    </TelegramContext.Provider>
  );
}

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ConfigProvider, Flex } from "antd";
import { useEffect } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Layout компонент оборачивает HydrateFallback, App, ErrorBoundary
export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isBrowser =
      typeof window !== "undefined" && typeof document !== "undefined";

    //   Серверный рендеринг - пропускаем
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
          }
          return;
        }

        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js?60";
        script.async = true;

        const scriptPromise = new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });

        document.head.appendChild(script);

        scriptPromise
          .then(() => {
            if (window.Telegram?.WebApp) {
              window.Telegram.WebApp.ready();
              window.Telegram.WebApp.expand();
            }
          })
          .catch(() => {});
      } catch (e) {}
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
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <Meta />
        <Links />
        <title>Лидия | Раскраски</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "var(--color-primary)",
          colorInfo: "var(--color-info)",
          colorSuccess: "var(--color-success)",
          colorError: "var(--color-error)",
          fontSize: 14,
          colorBgBase: "var(--color-bg)",
          colorBgContainer: "var(--color-bg)",
        },
        components: {
          Form: { itemMarginBottom: 0 },
          Segmented: {
            itemColor: "gray",
            itemSelectedColor: "white",
            itemSelectedBg: "var(--color-primary)",
            trackBg: "var(--color-bg)",
          },
          Typography: {
            size: 16,
          },
        },
      }}
    >
      <Flex vertical align="center">
        <Outlet />
      </Flex>
    </ConfigProvider>
  );
}

export function HydrateFallback() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>Loading...</h1>
    </main>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

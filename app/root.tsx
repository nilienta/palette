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

const getCSSVariable = (name: string, fallback: string): string => {
  if (typeof window === "undefined") return fallback;

  try {
    const computedStyle = getComputedStyle(document.documentElement);
    return computedStyle.getPropertyValue(name).trim() || fallback;
  } catch {
    return fallback;
  }
};

export const colors = {
  primary: getCSSVariable("--color-primary", "#7686ca"),
  primarySoft: getCSSVariable("--color-primary-soft", "#e8ecff"),
  primaryLight: getCSSVariable("--color-primary-light", "#9aabff"),
  info: getCSSVariable("--color-info", "#7686ca"),
  success: getCSSVariable("--color-success", "#42bd94"),
  successLight: getCSSVariable("--color-success-light", "#d4f0e6"),
  error: getCSSVariable("--color-error", "#ef5252"),
  errorLight: getCSSVariable("--color-error-light", "#fee2e2"),
  bg: getCSSVariable("--color-bg", "#fff2e9"),
  bgSoft: getCSSVariable("--color-bg-soft", "#fff9f5"),
};

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary,
          colorInfo: colors.info,
          colorSuccess: colors.success,
          colorError: colors.error,
          colorBgBase: colors.bg,
          colorBgContainer: colors.bg,
          fontSize: 14,
        },
        components: {
          Form: { itemMarginBottom: 0 },
          Segmented: {
            itemColor: "gray",
            itemSelectedColor: "white",
            itemSelectedBg: colors.primary,
            trackBg: colors.bg,
          },
          Typography: {
            size: 16,
            fontSizeHeading1: 32,
            fontSizeHeading2: 24,
            fontSizeHeading3: 20,
            fontSizeHeading4: 18,
            titleMarginBottom: 16,
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

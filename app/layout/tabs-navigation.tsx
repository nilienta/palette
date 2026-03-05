import { Outlet, useLocation, useNavigate, useNavigation } from "react-router";
import { Segmented, Typography } from "antd";
import { useEffect, useState } from "react";
import { useKeyboardActive } from "./useKeyboardActive";

const items = [
  {
    key: "",
    label: "Игры",
    icon: "🎲",
  },
  {
    key: "tracker",
    label: "Трекер",
    icon: "🗓️",
  },
  {
    key: "other",
    label: "Прочее",
    icon: "📚",
  },
  {
    key: "about",
    label: "Обо мне",
    icon: "👩🏼",
  },
];

export default function TabsNavigation() {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.substring(1) || "");

  const isKeyboardActive = useKeyboardActive();

  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path !== current) {
      setCurrent(path);
    }
  }, [location.pathname]);

  const onClick = (key: string) => {
    navigate(key);
  };

  return (
    <div className="max-w-3xl w-full h-min-screen mx-auto mt-4 mb-[98px]">
      <div
        className={`flex justify-center w-full max-w-3xl fixed bottom-0 z-50 bg-bg pb-6 ${isKeyboardActive && "hidden"}`}
      >
        <Segmented
          onChange={onClick}
          classNames={{
            item: "font-bold uppercase",
          }}
          value={current}
          options={items.map((item) => ({
            label: (
              <div style={{ padding: 4 }}>
                <span role="img" className="text-2xl">
                  {item.icon}
                </span>
                <div>{item.label}</div>
              </div>
            ),
            value: item.key,
          }))}
        />
      </div>

      <div
        className={navigation.state === "loading" ? "opacity-50 mx-4" : "mx-4"}
      >
        <Outlet />
      </div>
    </div>
  );
}

import { Outlet, useLocation, useNavigate, useNavigation } from "react-router";
import { Segmented } from "antd";
import { useEffect, useState } from "react";
import { useKeyboardActive } from "../useKeyboardActive";

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

  console.log("🎹 isKeyboardActive =", isKeyboardActive);
  console.log("🎹 style display =", isKeyboardActive ? "none" : "block");

  return (
    <div className="max-w-3xl w-full h-min-screen mx-auto mt-4 mb-[108px]">
      {isKeyboardActive ? (
        <div style={{ display: "none" }}>Скрыто</div>
      ) : (
        <div style={{ display: "block" }}>Видимо</div>
      )}
      <div
        className="w-full max-w-3xl fixed bottom-0 z-50 bg-bg pb-6"
        style={{ display: isKeyboardActive ? "none" : "block" }}
      >
        <Segmented
          onChange={onClick}
          classNames={{
            item: "font-bold uppercase",
          }}
          size="small"
          block
          value={current}
          options={items.map((item) => ({
            label: (
              <div>
                <span role="img" className="text-xl">
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

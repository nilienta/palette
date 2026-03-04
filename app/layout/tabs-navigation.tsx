import { Outlet, useLocation, useNavigate, useNavigation } from "react-router";
import { Segmented, Typography, type MenuProps } from "antd";

import { MailOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
const items: MenuProps["items"] = [
  {
    key: "",
    label: "Игры",
    icon: <MailOutlined />,
  },
  {
    key: "tracker",
    label: "Трекер",
    icon: <MailOutlined />,
  },
  {
    key: "other",
    label: "Прочее",
    icon: <MailOutlined />,
  },
  {
    key: "about",
    label: "Обо мне",
    icon: <MailOutlined />,
  },
];

// TODO: fix menu when update page
export default function TabsNavigation() {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.substring(1) || "");

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
      <Typography.Title level={1} className="text-center">
        Лидия Лайф Колор
      </Typography.Title>
      <div className="flex justify-center w-full max-w-3xl fixed bottom-0 z-50 bg-bg">
        <Segmented
          onChange={onClick}
          classNames={{
            item: "font-bold uppercase",
          }}
          value={current}
          options={[
            {
              label: (
                <div style={{ padding: 4 }}>
                  <span role="img" className="text-2xl">
                    🎲
                  </span>
                  <div>Игры</div>
                </div>
              ),
              value: "",
            },
            {
              label: (
                <div style={{ padding: 4 }}>
                  <span role="img" className="text-2xl">
                    🗓️
                  </span>
                  <div>Трекер</div>
                </div>
              ),
              value: "tracker",
            },
            {
              label: (
                <div style={{ padding: 4 }}>
                  <span role="img" className="text-2xl">
                    📚
                  </span>
                  <div>Прочее</div>
                </div>
              ),
              value: "other",
            },
            {
              label: (
                <div style={{ padding: 4 }}>
                  <span role="img" className="text-2xl">
                    👩🏼
                  </span>
                  <div>Обо мне</div>
                </div>
              ),
              value: "about",
            },
          ]}
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

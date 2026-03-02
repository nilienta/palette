import { Outlet, useLocation, useNavigate, useNavigation } from "react-router";
import { Flex, Menu, Segmented, Typography, type MenuProps } from "antd";
import { useEffect, useState } from "react";
import { MailOutlined } from "@ant-design/icons";

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

export default function TabsNavigation() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.substring(1) || "");

  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path) {
      setCurrent(path);
    }
  }, [location.pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <>
      <Typography.Title level={1} className="text-center">
        Лидия Лайф Колор
      </Typography.Title>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        classNames={{
          root: "w-full fixed bottom-0 z-50 justify-center",
          item: "font-bold uppercase flex justify-center",
        }}
      />
      <Flex className="w-full flex justify-center fixed bottom-0 z-50 bg-bg">
        <Segmented
          onChange={(key) => navigate(key)}
          classNames={{
            item: "font-bold uppercase flex justify-center",
          }}
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
      </Flex>

      <div
        className={
          navigation.state === "loading"
            ? "max-w-3xl mx-auto opacity-50"
            : "max-w-3xl mx-auto"
        }
      >
        <Outlet />
      </div>
    </>
  );
}

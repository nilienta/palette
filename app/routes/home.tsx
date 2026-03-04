import { Typography } from "antd";
import type { Route } from "./+types/home";
import Card from "~/ui/Card/Card";
import { useEffect, useState } from "react";
import type { Game } from "~/entities/Game/model/game";
import { getDataFromSheet } from "~/entities/Game/api/getDataFromSheet";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataInit = await getDataFromSheet();
        setData(dataInit);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Typography.Text>
        👋 Всем привет! Это сообщество посвящено настольным играм ручной работы,
        созданны для того, чтобы делать процесс раскрашивания ещё интереснее и
        увлекательнее!
      </Typography.Text>
      <Typography.Text>
        🎲 Игры разработаны для продвижения раскрасок Hachette Disney и
        позволяют не просто раскрашивать, а превращать это в настоящую игру,
        полную творчества и веселья.
      </Typography.Text>

      <div className="flex flex-wrap justify-center ">
        {loading && (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <div>Загрузка данных</div>
            <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
              Пожалуйста, подождите
            </div>
          </div>
        )}
        {error && (
          <div style={{ padding: "20px", color: "red", textAlign: "center" }}>
            <div>❌ Ошибка: {error}</div>
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: "10px", padding: "8px 16px" }}
            >
              Попробовать снова
            </button>
          </div>
        )}
        {data.map((game) => (
          <Card
            key={game.id}
            onClick={() => navigate(`/game/${game.id}`)}
            {...game}
          />
        ))}
      </div>
    </div>
  );
}

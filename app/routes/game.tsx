import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDataFromSheet } from "~/entities/Game/api/getDataFromSheet";
import type { Game } from "~/entities/Game/model/game";
import { useTelegramBackButton } from "~/shared/hooks/useTelegramBackButton";

// TODO добавить хэширование запросов api
export default function Game() {
  useTelegramBackButton();

  const { id } = useParams();

  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataInit = await getDataFromSheet();
        setData(dataInit);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const game = data.find((g) => g.id === id);
  if (loading) {
    return <Typography.Title level={3}>Loading...</Typography.Title>;
  }
  if (!game) {
    return <Typography.Title level={3}>Игра не найдена</Typography.Title>;
  }
  return (
    <div className="flex flex-col gap-2">
      {game.imgsSrc &&
        game.imgsSrc.map((_, index) => <img src={game.imgsSrc[index]} />)}
      <Typography.Title level={2}>{game.name}</Typography.Title>
      <Typography.Text>{game.description}</Typography.Text>
      <Typography.Text>{`Цена: ${game.price}₽`}</Typography.Text>
    </div>
  );
}

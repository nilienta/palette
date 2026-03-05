import { Form, Radio } from "antd";
import { useParams } from "react-router";
import { useGames } from "../hooks/useGames";
import { Order } from "~/shared/ui/Order/Order";

export default function OrderGame() {
  const { id } = useParams();
  const { data, loading, error } = useGames();

  const game = data.find((g) => g.id === id);
  if (!game) return <div>Игра не найдена</div>;
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  const gameData = {
    name: game.name,
    price: game.price,
    imgSrc: game.imgsSrc[0],
  };

  return <Order data={gameData} />;
}

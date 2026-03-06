import { Form, Radio } from "antd";
import { useParams } from "react-router";
import { useGames } from "../hooks/useGames";
import { Order } from "~/shared/ui/Order/Order";

export default function OrderGame() {
  const { id } = useParams();
  const { data, loading, error } = useGames();

  const game = data.find((g) => g.id === id);
  if (loading) return <p>Загрузка...</p>;
  if (game === undefined)
    return <p>Если загрузка больше 5 секунд, то игра не нашлась</p>;
  if (error) return <p>Ошибка загрузки</p>;

  const gameData = {
    name: game.name,
    price: game.price,
    imgSrc: game.imgsSrc[0],
  };

  return <Order data={gameData} />;
}

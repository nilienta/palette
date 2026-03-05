import { Form, Radio } from "antd";
import { Order } from "~/shared/ui/Order/Order";
import { useTracker } from "../hooks/useTracker";

export default function OrderTracker() {
  const { links, price, loading, error } = useTracker();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  const gameData = {
    name: "Трекер для раскрасок",
    price: price,
    imgSrc: links[0],
  };

  return (
    <Order data={gameData}>
      <Form.Item name="test">
        <Radio.Group
          options={[
            { value: "yes", label: "Да" },
            { value: "no", label: "Нет" },
          ]}
        />
      </Form.Item>
    </Order>
  );
}

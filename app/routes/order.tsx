import { Button, Form, Radio, Typography } from "antd";
import { useParams } from "react-router";
import { getGames } from "~/data";
import type { Route } from "./+types/home";
import { Input } from "antd";
const { TextArea } = Input;

export async function loader() {
  const { games } = await getGames();
  if (!games) {
    throw new Response("Игры не найдены", { status: 404 });
  }
  return games;
}

export default function Order({ loaderData }: Route.ComponentProps) {
  const { id } = useParams();
  const game = loaderData.find((g) => g.id === id);
  if (!game) {
    throw new Response("Игра не найдена", { status: 404 });
  }
  const { name, price, imgsSrc } = game;

  const [form] = Form.useForm();
  const handleSubmit = async (values: {
    delivery: string;
    address: string;
    comment: string;
  }) => {
    const tg = window?.Telegram?.WebApp;
    if (tg) {
      const text = `Здраствуйте, Лидия. Хочу выполнить заказ ${name}.
      	Цена: ${price}
      	Доставка: ${values.delivery}
	  	Адрес: ${values.address}
	  	Комментарии: ${values.comment}
      	Комплектация: всё и сразу`;
      const cleanText = text
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
      const encodedText = encodeURIComponent(cleanText.replace(/%0A/g, "%0A"));

      tg?.openTelegramLink(`https://t.me/Lidia_220210?text=${encodedText}`);
    }
  };

  return (
    <>
      <Typography.Title level={2}>Оформление заказа</Typography.Title>
      <Typography.Title level={3}>Товар</Typography.Title>
      {`${name} ${price}`}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ delivery: "Yandex" }}
      >
        <div className="flex flex-col gap-4">
          <Typography.Title level={3}>Доставка</Typography.Title>
          <Form.Item
            name="delivery"
            rules={[
              {
                required: true,
                message: "Пожалуйста, выберите способ доставки",
              },
            ]}
          >
            <Radio.Group
              options={[
                { value: "Yandex", label: "Яндекс" },
                { value: "Ozon", label: "Озон" },
                { value: "CDEK", label: "CDEK" },
                { value: "Почта России", label: "Почта России" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите адрес пункта выдачи",
              },
            ]}
          >
            <Input placeholder="Адрес пункта выдачи" />
          </Form.Item>
          <Form.Item name="comment">
            <TextArea rows={4} placeholder="Комментарий" />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" className="mt-6" htmlType="submit">
            Отправить заявку
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

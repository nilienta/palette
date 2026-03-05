import { Button, Form, Radio, Typography } from "antd";
import { useParams } from "react-router";
import { getGames } from "~/data";
import { Input } from "antd";
import { useTelegramBackButton } from "~/shared/hooks/useTelegramBackButton";
import type { Game } from "~/entities/Game/model/game";
import type { Tracker } from "~/entities/Tracker/modal/tracker";
import { useState, type PropsWithChildren } from "react";
const { TextArea } = Input;

export const Order = ({
  data,
  children,
}: PropsWithChildren<{
  data: { name: string; price: number; imgSrc: string };
}>) => {
  useTelegramBackButton();

  const { name, price, imgSrc } = data;

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
        {children}
      </Form>
    </>
  );
};

import { Typography, Form, Radio, Input, Space, Button } from "antd";
import {
  ShopOutlined,
  CarOutlined,
  MessageOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useTelegramBackButton } from "~/shared/hooks/useTelegramBackButton";
import { colors } from "~/root";
import { Title } from "./Title";
import { Card } from "./Card";
import type { Order as OrderType } from "~/entities/Order/model/order";
import { useTelegram } from "~/shared/providers/TelegramProvider";

const { Title: TitleAnt, Text } = Typography;
const { TextArea } = Input;

export type ChildWithFormProps = {
  onChange: (name: string, value: string) => void;
  onGet: (name: string) => string;
};

type Props = {
  data: { name: string; price: number; imgSrc: string };
  children?: React.ReactNode;
};

export const Order = ({ data, children }: Props) => {
  const { webApp } = useTelegram();
  useTelegramBackButton();

  const { name, price } = data;
  const [form] = Form.useForm();

  const handleSubmit = async (values: OrderType) => {
    if (webApp) {
      const { delivery, address, comment, cover, cut } = values;
      const text = `Здравствуйте, Лидия. Хочу выполнить заказ ${name}.
         Обложка: ${cover || "Стандартная"}
		${cut ? "Разрезать наклейки" : "Не разрезать наклейки"}
        Цена: ${price}
        Доставка: ${delivery}
  	  	Адрес: ${address}
  	  	Комментарии: ${comment || "Нет"}`;
      const cleanText = text
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
      const encodedText = encodeURIComponent(cleanText.replace(/%0A/g, "%0A"));

      webApp?.openTelegramLink(`https://t.me/Lidia_220210?text=${encodedText}`);
    }
  };

  return (
    <>
      <TitleAnt level={3} style={{ color: colors.primary, marginBottom: 16 }}>
        <ShoppingCartOutlined /> Оформление заказа
      </TitleAnt>
      <div
        className="p-3 rounded-xl mb-4"
        style={{
          background: colors.bgSoft,
          border: `1px solid ${colors.primary}20`,
        }}
      >
        <Title icon={<GiftOutlined />} title="Товар" />
        <div
          className="flex justify-between items-center p-2 rounded-lg"
          style={{ background: colors.bg }}
        >
          <div className="text-sm text-gray-700">{name}</div>
          <div
            className="text-base font-semibold"
            style={{ color: colors.primary }}
          >
            {price.toLocaleString()} ₽
          </div>
        </div>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ delivery: "Yandex" }}
      >
        <div className="flex flex-col gap-2">
          {children}
          <Card icon={<CarOutlined />} title="Доставка">
            <Form.Item
              name="delivery"
              rules={[{ required: true, message: "Выберите способ доставки" }]}
              style={{ marginBottom: 16 }}
            >
              <Radio.Group
                options={[
                  {
                    value: "Yandex",
                    label: <Text strong>Яндекс</Text>,
                  },
                  {
                    value: "Ozon",
                    label: <Text strong>Ozon</Text>,
                  },
                  {
                    value: "CDEK",
                    label: <Text strong>CDEK</Text>,
                  },
                  {
                    value: "Почта России",
                    label: <Text strong>Почта России</Text>,
                  },
                ]}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              />
            </Form.Item>

            <Form.Item
              name="address"
              label={
                <Space>
                  <ShopOutlined style={{ color: colors.primary }} />
                  <span>Адрес пункта выдачи</span>
                </Space>
              }
              rules={[
                { required: true, message: "Введите адрес пункта выдачи" },
              ]}
              style={{ marginBottom: 16 }}
            >
              <Input
                placeholder="г. Москва, ул. Примерная, д. 1"
                style={{
                  borderRadius: 8,
                  borderColor: colors.primary + "30",
                }}
              />
            </Form.Item>

            <Form.Item
              name="comment"
              label={
                <Space>
                  <MessageOutlined style={{ color: colors.primary }} />
                  <span>Комментарий к заказу</span>
                </Space>
              }
              style={{ marginBottom: 16 }}
            >
              <TextArea
                rows={3}
                placeholder="Дополнительная информация"
                style={{
                  borderRadius: 8,
                  borderColor: colors.primary + "30",
                  resize: "none",
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  height: 48,
                  background: colors.primary,
                  borderColor: colors.primary,
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 500,
                  boxShadow: `0 4px 12px ${colors.primary}40`,
                }}
              >
                Отправить заявку
              </Button>
            </Form.Item>
          </Card>
        </div>
      </Form>
    </>
  );
};

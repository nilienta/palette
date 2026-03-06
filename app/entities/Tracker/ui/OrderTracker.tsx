import { Order } from "~/shared/ui/Order/Order";
import { useTracker } from "../hooks/useTracker";
import { CoverSelector } from "~/shared/ui/CoverSelector/CoverSelector";
import { Typography, Form, Switch } from "antd";
import { ScissorOutlined } from "@ant-design/icons";
import { Card } from "~/shared/ui/Order/Card";

const { Text } = Typography;

export const OrderTracker = () => {
  const { links, price, loading, error } = useTracker();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  const trackerData = {
    name: "Трекер для раскрасок",
    price: price,
    imgSrc: links[0],
  };

  return (
    <Order data={trackerData}>
      <CoverSelector links={links} />
      <Card title="Уточнения" icon={<ScissorOutlined />}>
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="flex flex-col gap-1">
            <Text strong>Разрезать наклейки</Text>
            <Text style={{ fontSize: 12 }}>
              Наклейки будут разрезаны по контуру
            </Text>
          </div>
          <Form.Item name="cut">
            <Switch defaultChecked />
          </Form.Item>
        </div>
      </Card>
    </Order>
  );
};

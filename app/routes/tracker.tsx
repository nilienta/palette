import { Typography, Card, Space, Tag, Collapse } from "antd";
const { Panel } = Collapse;
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const { Paragraph, Text } = Typography;
import {
  CheckCircleOutlined,
  EyeOutlined,
  HeartOutlined,
  TrophyOutlined,
  BookOutlined,
  SmileOutlined,
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { ButtonYouTube } from "~/shared/ui/ButtonYouTube/ButtonYouTube";
import { useTelegramBackButton } from "~/shared/hooks/useTelegramBackButton";
import { colors } from "~/root";
import { useTracker } from "~/entities/Tracker/hooks/useTracker";
import { useNavigate } from "react-router";

export default function Tracker() {
  useTelegramBackButton();
  const navigate = useNavigate();

  const { links, price, videoUrl, loading, error } = useTracker();

  const [activePanels, setActivePanels] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
  ]);

  const formattedPrice = new Intl.NumberFormat("ru-RU").format(price);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl text-primary">
        Трекер для раскрасок
      </h2>
      <h4 className="text-center mb-4">Следи за прогрессом с удовольствием!</h4>
      <div className="flex flex-col gap-4 w-full mb-4 rounded-2xl p-4 bg-(--color-bg-soft)">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1.5}
          centeredSlides={true}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          className="w-full h-full"
        >
          {links.map((_, index) => (
            <SwiperSlide>
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={links[index]}
                  className="w-[70%] h-auto max-h-full object-contain"
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          style={{
            marginBottom: 16,
            borderRadius: 16,
            border: `1px solid ${colors.bg}30`,
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <Paragraph style={{ fontSize: 14, marginBottom: 0 }}>
              <Text strong style={{ color: colors.primary }}>
                Уникальный трекер для раскрасок с наклейками
              </Text>{" "}
              — идеальный помощник для любителей творчества.
            </Paragraph>
            {videoUrl && <ButtonYouTube url={videoUrl} />}
          </div>
        </div>
      </div>

      {/* Сворачивающиеся блоки */}
      <Collapse
        activeKey={activePanels}
        onChange={(keys) => setActivePanels(keys as string[])}
        expandIconPlacement="end"
        style={{
          background: "transparent",
          border: "none",
          marginBottom: 16,
        }}
        expandIcon={({ isActive }) => (
          <DownOutlined
            rotate={isActive ? 180 : 0}
            style={{ color: colors.primary }}
          />
        )}
        size="small"
      >
        {/* Как это работает */}
        <Panel
          header={
            <Space>
              <EyeOutlined style={{ color: colors.primary }} />
              <Text strong style={{ color: colors.primary }}>
                Как это работает?
              </Text>
            </Space>
          }
          key="1"
          style={{
            background: colors.primarySoft,
            borderRadius: 12,
            marginBottom: 8,
            border: `1px solid ${colors.primary}30`,
          }}
        >
          <Paragraph style={{ fontSize: 14, padding: "0 12px 12px 12px" }}>
            В трекере есть специальные окошки для каждой иллюстрации. После
            завершения работы приклеиваете в окошко наклейку.
          </Paragraph>

          <ul className="space-y-1">
            {[
              "наглядно видите прогресс",
              "отмечаете законченные работы",
              "создаёте коллекцию достижений",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2 px-3 py-1">
                <CheckCircleOutlined
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#42bd94", fontSize: 14 }}
                />
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Почему это круто */}
        <Panel
          header={
            <Space>
              <HeartOutlined style={{ color: colors.error }} />
              <Text strong style={{ color: colors.error }}>
                Почему это круто?
              </Text>
            </Space>
          }
          key="2"
          style={{
            background: colors.errorLight,
            borderRadius: 12,
            marginBottom: 8,
            border: `1px solid ${colors.error}30`,
          }}
        >
          <div style={{ padding: "0 12px 12px 12px" }}>
            <Space
              orientation="vertical"
              size="small"
              style={{ width: "100%" }}
            >
              <div>
                <Tag
                  color="#42bd94"
                  style={{
                    background: colors.success,
                    color: "#fff",
                    marginRight: 4,
                  }}
                >
                  🎮 Игровой формат
                </Tag>
                <Text style={{ fontSize: 14 }}>
                  Приклеивание наклеек превращает процесс в игру
                </Text>
              </div>
              <div>
                <Tag
                  color="#7686ca"
                  style={{
                    background: colors.primary,
                    color: "#fff",
                    marginTop: 8,
                    marginRight: 4,
                  }}
                >
                  ⚡ Мотивация
                </Tag>
                <Text style={{ fontSize: 14 }}>
                  Каждое задание вознаграждается
                </Text>
              </div>
              <div>
                <Tag
                  color="#ef5252"
                  style={{
                    background: colors.error,
                    color: "#fff",
                    marginTop: 8,
                    marginRight: 4,
                  }}
                >
                  🎯 Визуальный результат
                </Tag>
                <Text style={{ fontSize: 14 }}>
                  Красочный альбом достижений
                </Text>
              </div>{" "}
            </Space>
          </div>
        </Panel>

        {/* Что в комплекте */}
        <Panel
          header={
            <Space>
              <TrophyOutlined style={{ color: colors.success }} />
              <Text strong style={{ color: colors.success }}>
                Что в комплекте?
              </Text>
            </Space>
          }
          key="3"
          style={{
            background: colors.successLight,
            borderRadius: 12,
            marginBottom: 8,
            border: `1px solid ${colors.success}30`,
          }}
        >
          <ul className="space-y-1">
            {[
              { emoji: "📋", text: "трекер с пронумерованными окошками" },
              { emoji: "🎨", text: "набор ярких наклеек" },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2 px-3 py-1">
                <span className="text-base mt-0.5">{item.emoji}</span>
                <span className="text-sm text-gray-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Характеристики */}
        <Panel
          header={
            <Space>
              <BookOutlined style={{ color: colors.primary }} />
              <Text strong style={{ color: colors.primary }}>
                Характеристики
              </Text>
            </Space>
          }
          key="4"
          style={{
            background: colors.primarySoft,
            borderRadius: 12,
            border: `1px solid ${colors.primary}30`,
          }}
        >
          <div style={{ padding: "0 12px 12px 12px" }}>
            <Space orientation="vertical" size="small">
              <Text>
                <Text type="secondary">Формат:</Text> A4
              </Text>
              <Text>
                <Text type="secondary">Материал:</Text> плотная бумага 160 гр.
              </Text>
              <Text>
                <Text type="secondary">Дизайн:</Text> нейтральный фон
              </Text>
            </Space>
          </div>
        </Panel>
      </Collapse>

      <Card
        size="small"
        style={{
          background: colors.successLight,
          borderColor: colors.success,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Paragraph style={{ fontSize: 14, textAlign: "center", margin: 0 }}>
          <SmileOutlined style={{ color: colors.success, marginRight: 8 }} />
          Отмечайте достижения красивыми наклейками!
        </Paragraph>
      </Card>

      <div
        style={{
          position: "sticky",
          bottom: 86,
          zIndex: 49,
          display: window.innerWidth < 768 ? "block" : "none",
        }}
      >
        <div className="rounded-2xl mb-4 p-4 bg-(--color-primary-soft) border border-(--color-primary) border-opacity-30">
          <div className="flex items-center justify-between gap-3">
            <div className="text-left">
              <div className="flex flex-col">
                <h3
                  className="font-semibold m-0 leading-tight"
                  style={{
                    color: colors.primary,
                    fontSize: 24,
                    lineHeight: 1.35,
                  }}
                >
                  {formattedPrice}₽
                </h3>
                <span className="text-gray-500" style={{ fontSize: 11 }}>
                  за трекер для одной раскраски
                </span>
              </div>
            </div>

            <button
              className="rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95"
              style={{
                width: 48,
                height: 48,
                background: colors.success,
                border: `1px solid ${colors.success}`,
                boxShadow: `0 4px 10px ${colors.success}60`,
              }}
              onClick={() => navigate("/order/tracker")}
            >
              <ShoppingCartOutlined style={{ color: "white", fontSize: 20 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

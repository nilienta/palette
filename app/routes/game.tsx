import { Button, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getDataFromSheet } from "~/entities/Game/api/getDataFromSheet";
import type { Game } from "~/entities/Game/model/game";
import { useTelegramBackButton } from "~/shared/hooks/useTelegramBackButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { ButtonYouTube } from "~/shared/ui/ButtonYouTube/ButtonYouTube";

// TODO добавить хэширование запросов api
export default function Game() {
  useTelegramBackButton();

  const { id } = useParams();
  const navigate = useNavigate();

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

  const paginationRef = useRef(null);

  const game = data.find((g) => g.id === id);
  if (loading) return <p>Загрузка...</p>;
  if (game === undefined)
    return <p>Если загрузка больше 5 секунд, то игра не нашлась</p>;

  return (
    <div className="flex flex-col gap-2 w-full ">
      <Swiper
        modules={[Pagination]}
        spaceBetween={2}
        slidesPerView={1}
        grabCursor={true}
        pagination={{
          clickable: true,
          el: paginationRef.current,
        }}
        className="w-full h-full"
      >
        {game.imgsSrc.map((_, index) => (
          <SwiperSlide>
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={game.imgsSrc[index]}
                className="w-[70%] h-auto max-h-full object-contain"
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={paginationRef}
        className="w-full flex justify-center items-center"
      />
      <div className="w-full flex  items-start gap-2">
        <Typography.Title level={2}>{game.name}</Typography.Title>
        {game.videoUrl && <ButtonYouTube url={game.videoUrl} />}
      </div>

      <Typography.Text>{game.description}</Typography.Text>
      <div className="w-full flex justify-between items-center gap-2">
        <Typography.Text>{`Цена: ${game.price}₽`}</Typography.Text>
        <Button type="primary" onClick={() => navigate(`/order/${id}`)}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

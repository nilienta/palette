import { Flex, Typography, Card, Spin, Alert } from "antd";
import { useEffect, useState } from "react";

/**
 * Мок‑данные, используемые когда запрос к API не удался.
 * Поля: id, title, imgUrl, summary
 */
const mockCharacters = [
  {
    id: 1,
    title: "Mickey Mouse",
    imgUrl:
      "https://static.wikia.nocookie.net/disney/images/5/5e/Mickey_Mouse.png",
    summary: "Самый известный персонаж Диснея",
  },
  {
    id: 2,
    title: "Minnie Mouse",
    imgUrl:
      "https://static.wikia.nocookie.net/disney/images/9/9c/Minnie_Mouse.png",
    summary: "Подруга Микки, тоже известна по всему миру",
  },
  // Добавьте при необходимости больше записей
];

export default function EncyclopediaDisney() {
  const [characters, setCharacters] = useState<
    Array<{ id: number; title: string; imgUrl: string; summary: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const proxyUrl = "https://corsproxy.io/?";
    const categoryTitle = "Category:Characters";
    const apiUrl = `https://disney.fandom.com/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(
      categoryTitle
    )}&cmlimit=500&format=json`;

    fetch(proxyUrl + apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const fetched = data.query?.categorymembers?.map((item: any) => ({
          id: item.pageid,
          title: item.title,
          imgUrl: "", // API не возвращает изображение, оставляем пустым
          summary: "",
        })) as any;
        setCharacters(fetched.length ? fetched : mockCharacters);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Не удалось загрузить данные, показываем мок‑данные.");
        setCharacters(mockCharacters);
        setLoading(false);
      });
  }, []);

  return (
    <Flex vertical gap="large" style={{ padding: "24px" }}>
      <Typography.Title level={1}>Энциклопедия Disney</Typography.Title>
      {loading && <Spin tip="Загрузка..." />}
      <Flex wrap="wrap" gap="middle">
        {characters.map((char) => (
          <Card
            key={char.id}
            hoverable
            style={{ width: 240 }}
            cover={char.imgUrl && <img alt={char.title} src={char.imgUrl} />}
          >
            <Card.Meta title={char.title} description={char.summary} />
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}

import {
  Flex,
  Typography,
  Card,
  Spin,
  Alert,
  List,
  Select,
  Collapse,
  Button,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import EncyclopediaFilters from "./EncyclopediaFilters";
import charactersList from "../json-db/characters.json";
import cartoonsData from "../json-db/character_cartoons.json";
import cartoonsList from "../json-db/cartoons.json";
import volumesList from "../json-db/volumes.json";
import volumesData from "../json-db/character_volumes.json";
import type { CartoonCharacter, CharacterVolume } from "~/json-db/types";

type VolumeInfo = {
  title: string;
  page: number;
};

export type CharacterInfo = {
  id: number;
  name: string;
  description: string;
  image: string;
  cartoon: string;
  volumes: VolumeInfo[];
};

export default function Encyclopedia() {
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  // фильтры
  const [selectedCartoon, setSelectedCartoon] = useState<string>("");
  const [selectedVolume, setSelectedVolume] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const merged: CharacterInfo[] = charactersList.map((char) => {
      const volumeLink = (cartoonsData as any).find(
        (c: { characterId: number; volumeId: number }) =>
          c.characterId === char.id
      );

      const cartoonEntry = cartoonsList.find((ct) =>
        ct.volumes?.includes(volumeLink?.volumeId)
      );

      const volumeLinks = volumesData.filter(
        (v: CharacterVolume) => v.characterId === char.id
      );

      const volumeEntries = volumeLinks
        .map((link) => {
          const vol = volumesList.find((v) => v.id === link.volumeId);
          return vol ? { title: vol.title, page: vol.number } : null;
        })
        .filter(Boolean) as VolumeInfo[];

      return {
        id: char.id,
        name: char.name,
        description: char.description,
        image: char.image,
        cartoon: cartoonEntry?.title ?? "",
        volumes: volumeEntries,
      };
    });

    merged.sort((a, b) => a.name.localeCompare(b.name));

    setCharacters(merged);
    setLoading(false);
  }, []);

  return (
    <Flex vertical gap="large" style={{ padding: "24px" }}>
      <Typography.Title level={1}>Энциклопедия персонажей</Typography.Title>
      {loading && <Spin tip="Загрузка..." />}
      {/* Фильтры */}
      <EncyclopediaFilters
        characters={characters}
        selectedCartoon={selectedCartoon}
        setSelectedCartoon={setSelectedCartoon}
        selectedVolume={selectedVolume}
        setSelectedVolume={setSelectedVolume}
        onReset={() => {
          setSelectedCartoon("");
          setSelectedVolume("");
        }}
      />
      <Flex wrap="wrap" gap="middle" justify="space-between">
        {characters
          .filter((char) => {
            const cartoonMatch = selectedCartoon
              ? char.cartoon === selectedCartoon
              : true;
            const volumeMatch = selectedVolume
              ? char.volumes.some((v) => v.title === selectedVolume)
              : true;
            return cartoonMatch && volumeMatch;
          })
          .map((char) => (
            <Card
              key={char.id}
              hoverable
              style={{ flex: "1 0 200px" }}
              // cover={char.image && <img alt={char.name} src={char.image} />}
            >
              <Card.Meta title={char.name} description={char.description} />
              <div style={{ marginTop: 8 }}>
                <Typography.Text strong>Мультфильм:</Typography.Text>{" "}
                {char.cartoon || "—"}
              </div>
              {char.volumes.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <Collapse bordered={false} defaultActiveKey={[]}>
                    <Collapse.Panel
                      header={<Typography.Text strong>Тома:</Typography.Text>}
                      key="volumes"
                    >
                      <List
                        size="small"
                        dataSource={char.volumes}
                        renderItem={(item) => (
                          <List.Item>
                            {item.title} <Tag color="blue">{item.page}</Tag>
                          </List.Item>
                        )}
                      />
                    </Collapse.Panel>
                  </Collapse>
                </div>
              )}
            </Card>
          ))}
      </Flex>
    </Flex>
  );
}

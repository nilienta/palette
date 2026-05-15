import { Flex, Select, Button } from "antd";
import type { Dispatch, SetStateAction } from "react";
import type { CharacterInfo } from "./encyclopedia";

type Props = {
  characters: CharacterInfo[];
  selectedCartoon: string;
  setSelectedCartoon: Dispatch<SetStateAction<string>>;
  selectedVolume: string;
  setSelectedVolume: Dispatch<SetStateAction<string>>;
  onReset: () => void;
};

export default function EncyclopediaFilters({
  characters,
  selectedCartoon,
  setSelectedCartoon,
  selectedVolume,
  setSelectedVolume,
  onReset,
}: Props) {
  return (
    <Flex gap="middle" align="center" wrap="wrap">
      <Select
        placeholder="Фильтр по мультфильму"
        allowClear
        style={{ minWidth: 200 }}
        value={selectedCartoon || undefined}
        onChange={(value) => setSelectedCartoon(value as string)}
      >
        {Array.from(new Set(characters.map((c) => c.cartoon)))
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
          .map((cartoon) => (
            <Select.Option key={cartoon} value={cartoon}>
              {cartoon}
            </Select.Option>
          ))}
      </Select>
      <Select
        placeholder="Фильтр по тому"
        allowClear
        style={{ minWidth: 200 }}
        value={selectedVolume || undefined}
        onChange={(value) => setSelectedVolume(value as string)}
      >
          {Array.from(new Set(characters.flatMap((c) => c.volumes.map((v) => v.title))))
            .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
          .map((title) => (
            <Select.Option key={title} value={title}>
              {title}
            </Select.Option>
          ))}
      </Select>
      <Button onClick={onReset}>Сбросить фильтры</Button>
    </Flex>
  );
}

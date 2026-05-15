export async function getGames() {
  return {
    games: [
      {
        id: "1",
        name: "Загадочный расклад",
        description:
          "🎲 Загадочный расклад — игра для тех, кто любит загадки и творчество",
        imgsSrc: [
          "https://photo-cdn2.icons8.com/y3nMs8NvfYT7GOKslEtLGHsX_B-1FfsenEPZk2lt54A/rs:fit:576:576/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvNjg4LzA3ZmU3/NDAyLTcwMGUtNDdi/Yi1hNzQ3LWJhZDBh/MjljMDk1My5qcGc.webp",
        ],
        price: "2 500 ₽",
      },
      {
        id: "2",
        name: "Колорквест",
        description: "Рандомно вытащи карточку с заданием.",
        imgsSrc: [
          "https://photo-cdn2.icons8.com/ci3JhEFwAlnAnjwwbW1W1qv_cQQPr1INo5reFRF4JI8/rs:fit:576:576/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvODc2LzcwMDA3/NWFhLTlmN2UtNGNm/Yy1iZjgzLWY0YWRl/YzcxZmJkZS5qcGc.webp",
        ],
        price: "4 000 ₽",
      },
      {
        id: "3",
        name: "240 дней с langoстиной guangoвной",
        imgsSrc: [
          "https://photo-cdn2.icons8.com/8FdTzZwzAwjkuzLxGsqmIjkDSdQG6JwGMrlEOsIpmSM/rs:fit:576:576/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMTY1L2RlYjYx/MGMzLTUyZmYtNDdm/NC04NzAxLWQ5ODM3/YjUyNzMxOC5qcGc.webp",
          "https://photo-cdn2.icons8.com/OJCOaiMZf_kiKRHIiLLiaE7doXAYKe42zsZ2tQohOsc/rs:fit:576:576/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMTM2LzhkYWRm/ODY3LTFkZjItNDg3/OS05NWRjLTgyYjUy/ZWU1OTU2ZC5qcGc.webp",
        ],
        price: "4 600 ₽",
        description:
          " 240 дней с Langoстиной Guangoвной — творческое приключение для всех любителей раскрасок!",
      },
    ],
  };
}

import charactersData from "./json-db/characters.json";
import volumesData from "./json-db/volumes.json";
import cartoonsData from "./json-db/cartoons.json";
import type {
  Character,
  Volume,
  Cartoon,
  CharacterVolume,
} from "./json-db/types";

export const characters: Character[] = charactersData;
export const volumes: Volume[] = volumesData;
export const cartoons: Cartoon[] = cartoonsData;

const DB_PATH = "/json-db";

async function loadJson(file: string) {
  const response = await fetch(`${DB_PATH}/${file}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${file}`);
  }

  return response.json();
}

export async function getVolumeById(volumeId: number) {
  const [volumes, characters, characterVolumes] = (await Promise.all([
    loadJson("volumes.json"),
    loadJson("characters.json"),
    loadJson("character_volumes.json"),
  ])) as [Volume[], Character[], CharacterVolume[]];

  const volume = volumes.find((v) => v.id === volumeId);

  if (!volume) {
    throw new Error("Volume not found");
  }

  const characterIds = characterVolumes
    .filter((rel) => rel.volumeId === volumeId)
    .map((rel) => rel.characterId);

  const volumeCharacters = characters.filter((character) =>
    characterIds.includes(character.id)
  );

  return {
    ...volume,
    characters: volumeCharacters,
  };
}

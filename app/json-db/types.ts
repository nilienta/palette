export type Character = {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  universe: string;
};

export type Volume = {
  id: number;
  title: string;
  releaseYear: number | null;
  coverImage: string;
  slug: string;
  number: number;
  universe: string;
};

export type Cartoon = {
  id: number;
  title: string;
  poster: string;
  slug: string;
  originalTitle: string | null;
  releaseYear: number | null;
  volumes: number[];
  universe: string;
};

export type CharacterVolume = {
  characterId: number;
  volumeId: number;
};

export type CartoonCharacter = {
  cartoonId: number;
  characterId: number;
};

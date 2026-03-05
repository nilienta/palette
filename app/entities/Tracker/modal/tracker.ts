export interface Tracker {
  links: string[]; // все ссылки из колонки ids
  price: number; // цена из первой строки
  videoSrc?: string; // ссылка на видео из первой строки
}

export const PUBLISHED_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRjNA77vyzBlWRyGiSgM7_gAywUfyqq1mjL-9IWwt9xONxMYvp6bqsnCevC9tiE_va8hA6bwCAEYDfg/pub?gid=0&single=true&output=csv";

interface SheetRow {
  ids: string;
  price?: string;
  videoUrl?: string;
}
export interface SheetData {
  links: string[];
  price: number;
  videoUrl: string | null;
}

export async function parseSheetData(sheetUrl: string): Promise<SheetData> {
  try {
    // Преобразуем ссылку на Google Sheets в CSV формат
    const csvUrl = sheetUrl.replace("/edit?gid=", "/export?format=csv&gid=");

    // Загружаем CSV
    const response = await fetch(csvUrl);
    const csvText = await response.text();

    // Парсим CSV
    const rows = csvText.split("\n").filter((row) => row.trim());
    if (rows.length < 2) {
      throw new Error("Таблица пуста или содержит только заголовки");
    }

    // Получаем заголовки (первая строка) - ВСЕГДА В НИЖНЕМ РЕГИСТРЕ
    const headers = parseCSVLine(rows[0]).map((h) => h.trim().toLowerCase());

    // Находим индексы нужных колонок (ВСЕ В НИЖНЕМ РЕГИСТРЕ)
    const idsIndex = headers.findIndex((h) => h === "ids");
    const priceIndex = headers.findIndex((h) => h === "price");
    const videoUrlIndex = headers.findIndex((h) => h === "videourl"); // В НИЖНЕМ РЕГИСТРЕ!

    if (idsIndex === -1) {
      throw new Error('Колонка "ids" не найдена');
    }

    // Парсим первую строку с данными (для price и videoUrl)
    const firstRowValues = parseCSVLine(rows[1]);

    // Получаем price из первой строки
    let price = 0;
    if (priceIndex !== -1 && firstRowValues[priceIndex]) {
      const priceStr = firstRowValues[priceIndex].replace(/[^\d]/g, "");
      price = parseInt(priceStr, 10) || 0;
    }

    // Получаем videoUrl из первой строки
    let videoUrl: string | null = null;
    if (videoUrlIndex !== -1 && firstRowValues[videoUrlIndex]) {
      videoUrl = firstRowValues[videoUrlIndex].trim() || null;
    }

    // Собираем все ссылки из колонки ids
    const links: string[] = [];

    for (let i = 1; i < rows.length; i++) {
      const values = parseCSVLine(rows[i]);
      const link = values[idsIndex]?.trim();

      // Проверяем, что это валидная ссылка
      if (link && link.startsWith("http")) {
        links.push(link);
      }
    }

    return {
      links,
      price,
      videoUrl,
    };
  } catch (error) {
    console.error("Ошибка при парсинге Google Sheets:", error);
    return {
      links: [],
      price: 0,
      videoUrl: null,
    };
  }
}

// Функция для парсинга строки CSV с учётом кавычек
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let currentField = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
      currentField += char;
    } else if (char === "," && !insideQuotes) {
      fields.push(currentField);
      currentField = "";
    } else {
      currentField += char;
    }
  }

  fields.push(currentField);

  // Очищаем поля от кавычек
  return fields.map((field) => {
    if (field.startsWith('"') && field.endsWith('"')) {
      return field.slice(1, -1);
    }
    return field;
  });
}

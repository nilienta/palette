import type { Game } from "../model/game";

const GOOGLE_SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_3I_g00tGYyMSfntUw-g7zNkZxbERe2K86kD-AeNofHTUxRc9P1d3uLFFQ2CO-EehcGGk0z1UsVIa/pub?gid=0&single=true&output=csv";

export async function getDataFromSheet() {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL);
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    return [];
  }
}

function parseCSV(csvText: string) {
  // Разбиваем на строки с учётом кавычек
  const lines = [];
  let currentLine = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
      currentLine += char;
    } else if (char === "\n" && !insideQuotes) {
      if (currentLine.trim()) lines.push(currentLine);
      currentLine = "";
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim()) lines.push(currentLine);

  // Получаем заголовки (первая строка)
  const headers = parseCSVLine(lines[0]);

  // Парсим остальные строки в объекты
  const result: [] | Game[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue; // пропускаем пустые строки

    const values = parseCSVLine(lines[i]);
    const rowObject: Game = {
      id: "",
      name: "",
      description: "",
      imgsSrc: [],
      price: 0,
    };

    headers.forEach((header, index) => {
      let value = values[index] || "";

      // Убираем внешние кавычки, если есть
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      // Обработка по имени поля
      switch (header.trim()) {
        case "id":
          rowObject.id = value.toString();
          break;

        case "name":
          rowObject.name = value.trim();
          break;

        case "description":
          rowObject.description = value.trim();
          break;

        case "imgsSrc":
          // Разбиваем ссылки по переносу строки
          rowObject.imgsSrc = value
            .split("\n")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          break;

        case "price":
          // Преобразуем цену в число (убираем пробелы и символ ₽)
          const priceStr = value.replace(/[^\d]/g, "");
          rowObject.price = parseInt(priceStr, 10) || 0;
          break;

        default:
          break;
      }
    });

    result.push(rowObject);
  }

  return result;
}

// Вспомогательная функция для парсинга одной строки CSV с учётом кавычек
function parseCSVLine(line: string) {
  const fields = [];
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

  return fields;
}

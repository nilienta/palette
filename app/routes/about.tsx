import { Typography } from "antd";

export default function About() {
  return (
    <>
      <Typography.Title level={2}>Обо мне</Typography.Title>
      <Typography.Text>
        Привет! Меня зовут Лидия. Я раскрашиваю с 2023 года. Я создаю игры,
        Адвенты, трекеры для раскрасок. В 2025 году сбылась моя мечта, я ушла на
        удаленную работу. Если ты творческий человек, давай творить вместе.
      </Typography.Text>
      <Typography.Title level={3}>Ссылки</Typography.Title>
      <ul>
        <li>
          <a href="https://t.me/Ic7ogViqKSg2ZDgy">Телеграмм канал</a>
        </li>
        <li>
          <a href="https://vk.com/club232591789">
            ВК сообщество с моими товарами
          </a>
        </li>
        <li>
          <a href="https://dzen.ru/id/66ab8dc20eddc77a44896f60">
            Канал на Дзен
          </a>
        </li>
      </ul>
    </>
  );
}

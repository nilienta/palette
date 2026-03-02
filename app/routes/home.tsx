import { Flex, Typography } from "antd";
import type { Route } from "./+types/home";
import { getGames } from "~/data";
import Card from "~/ui/Card/Card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const { games } = await getGames();
  if (!games) {
    throw new Response("Игры не найдены", { status: 404 });
  }
  return games;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-2">
      <Typography.Text>
        👋 Всем привет! Это сообщество посвящено настольным играм ручной работы,
        созданны для того, чтобы делать процесс раскрашивания ещё интереснее и
        увлекательнее!
      </Typography.Text>
      <Typography.Text>
        🎲 Игры разработаны для продвижения раскрасок Hachette Disney и
        позволяют не просто раскрашивать, а превращать это в настоящую игру,
        полную творчества и веселья.
      </Typography.Text>

      <div className="flex flex-wrap justify-center ">
        {loaderData.map((game) => (
          <Card key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}

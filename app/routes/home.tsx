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
    <>
      <p>
        👋 Всем привет! Это сообщество посвящено настольным играм ручной работы,
        созданным для того, чтобы делать процесс раскрашивания ещё интереснее и
        увлекательнее! 🎲🎨 Игры разработаны для продвижения раскрасок Hachette
        Disney от Лидии Life and Colouring и позволяют не просто раскрашивать, а
        превращать это в настоящую игру, полную творчества и веселья.
        Присоединяйтесь, чтобы играть, раскрашивать и создавать свои маленькие
        шедевры! 🌟
      </p>
      <div className="flex flex-wrap justify-center m-4">
        {loaderData.map((game) => (
          <Card key={game.id} {...game} />
        ))}
      </div>
    </>
  );
}

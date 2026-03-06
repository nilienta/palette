import { useParams } from "react-router";
import { useTelegramBackButton } from "~/shared/hooks/useTelegramBackButton";
import OrderGame from "~/entities/Game/ui/OrderGame";
import { OrderTracker } from "~/entities/Tracker/ui/OrderTracker";

export default function Order() {
  useTelegramBackButton();
  const { id } = useParams();

  return <>{id === "tracker" ? <OrderTracker /> : <OrderGame />}</>;
}

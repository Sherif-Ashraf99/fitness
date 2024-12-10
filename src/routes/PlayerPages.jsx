import { useParams } from "react-router-dom";
import PlayerDetails from "src/pages/Twist/PlayerDetails";
import NewPlayerDetails from "src/pages/Twist/NewPlayerDetails";

export default function PlayerPages() {
  const { sportName } = useParams();
  return !sportName ? <NewPlayerDetails /> : <PlayerDetails />;
}

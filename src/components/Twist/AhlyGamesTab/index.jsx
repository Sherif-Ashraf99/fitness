import styles from "./index.module.css";
import GameCard from "../GameCard";
import GamesQuestions from "src/pages/Twist/GamesQuestions";

function AhlyGamesTab() {
  return (
    <div className={styles["ahly-games"]}>
      <h1>{"العاب تويست سبورتس"}</h1>
      <p>
        {
          "العب مع تويست سبورتس وجمع نقط من الألعاب المختلفة لكي يكون لك فرصة في الفوز بجوائز قيمة"
        }
      </p>
      <div className={styles["game-card-wrapper"]}>
        <GamesQuestions />
      </div>
    </div>
  );
}

export default AhlyGamesTab;

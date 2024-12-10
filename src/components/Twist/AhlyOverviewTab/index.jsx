import styles from "./index.module.css";
import TeamCalendar from "src/components/Twist/TeamCalendar";
import AhlyNews from "src/components/Twist/AhlyNews";
import AhlyTournaments from "src/components/Twist/AhlyTournaments";
import AhlyMedia from "src/components/Twist/AhlyMedia";
import BestPlayers from "src/components/Twist/BestPlayers";
import NewTopNews from "src/components/NewTopNews";

function AhlyOverviewTab({ id }) {
  return (
    <div className={styles["ahly-overview"]}>
      <TeamCalendar team_id={id} />
      {/* <AhlyNews sport_id={1} service_id={7} type={1} team_id={id} /> */}
      <NewTopNews team_id={id} />
      <AhlyTournaments team_id={id} />
      <AhlyMedia team_id={id} />
      {/* <BestPlayers /> */}
    </div>
  );
}

export default AhlyOverviewTab;

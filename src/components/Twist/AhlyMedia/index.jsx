import MediaSection from "src/components/Twist/shared/MediaSection";
import { sharedComponentsContext } from "src/context/shared-context";
import AhlyRanking from "../AhlyRanking";
import TopScorers from "../TopScorers";
import styles from "./index.module.css";
import { useContext } from 'react';

function AhlyMedia({ team_id }) {
  const { seasonInfo: { appActiveSeason } } = useContext(sharedComponentsContext);

  return <div className={styles["ahly-media"]}>
    <div className={styles["statistics"]}>
      <AhlyRanking />
      <TopScorers team_id={team_id} />
    </div>
    <div className={styles["media"]}>
      <MediaSection
        season_id={appActiveSeason.id}
        type={2}
        items_count={4}
        latest={true}
        isPlayBtn={true}
        title='فيديوهات'
        columnsNum={2}
        team_id={team_id}
        columnsLoaderNums={2}
        loaderCount={4}
        isArrowPage={false}          

      />
    </div>

  </div>
}

export default AhlyMedia;

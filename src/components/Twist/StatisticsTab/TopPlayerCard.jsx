import { ImgURL } from "src/utils/globalFn";
import styles from "./TopPlayerCard.module.css";
import PropTypes from "prop-types";
import apis from "src/services/Twist";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import emptyImg from "src/assets/images/Twist/user-icon.png";

const apiFn = (title, params) => {
  if (title === "الأهداف") return apis.teams.getTopScorers(params);
  return apis.teams.getTopAssists(params);
};
function TopPlayerCard({
  title,
  sport_id,
  season_id,
  tournament_id,
  team_id,
  handleClick,
  isLoadingTeamData,
}) {
  const { data = {}, isLoading } = useQuery({
    queryKey: ["Top-Players", team_id, title, tournament_id],
    queryFn: () =>
      apiFn(title, {
        sport_id: sport_id,
        season_id: season_id,
        tournament_id: tournament_id,
        team_id: team_id,
      }),
    enabled: !!season_id && !!tournament_id,
  });
  if (isLoading || isLoadingTeamData) {
    return (
      <div
        className={`${styles["loader"]} ${
          team_id == "6631" && styles["al-ahly-page"]
        }`}>
        <Skeleton />
        <div className={styles["loader-header"]}>
          {[...Array(3).keys()].map((key) => (
            <div key={key} className={styles["header-element"]}>
              <Skeleton circle />
              <Skeleton circle />
              <Skeleton />
              <Skeleton />
            </div>
          ))}
        </div>
        <div className={styles["loader-body"]}>
          {[...Array(4).keys()].map((key) => (
            <div key={key}>
              <Skeleton circle />
              <div>
                <Skeleton />
                <Skeleton />
              </div>
              <Skeleton circle />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`${styles["TopPlayerCard"]}`}>
        <h5>{title}</h5>
        <h3>لا يوجد معلومات</h3>
      </div>
    );
  }

  return (
    <div className={`${styles["TopPlayerCard"]}`}>
      <h5>{title}</h5>
      <div className={styles["All-Top-Players"]}>
        {data?.slice(0, 3)?.map((player) => (
          <div
            key={player?.id}
            className={styles["Top-Player"]}
            onClick={() => handleClick(player?.service[0], player?.id)}>
            <div className={styles["player-circle"]}>
              <img src={ImgURL(player?.image) || emptyImg} alt='' />
              <div className={styles["score"]}>
                {player?.goals || player?.assissts}
              </div>
            </div>
            <h4>{player?.name.split(" ").slice(0, 3).join(" ")}</h4>
            <span>{player?.player_position}</span>
          </div>
        ))}
      </div>
      <div className={styles["All-Another-Players"]}>
        {data?.slice(3, 7).map((player) => (
          <div
            key={player?.id}
            className={styles["Another-Player"]}
            onClick={() => handleClick(player?.service[0], player.id)}>
            <div className={styles["title"]}>
              <div className={styles["player-circle"]}>
                <img src={ImgURL(player?.image) || emptyImg} alt='' />
              </div>
              <div className={styles["player-detalis"]}>
                <h6>{player?.name.split(" ").slice(0, 3).join(" ")}</h6>
                <span>{player?.player_position}</span>
              </div>
            </div>
            <div className={styles["score"]}>
              {player?.goals || player?.assissts}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
TopPlayerCard.propTypes = {
  title: PropTypes.string,
  isLoadingTeamData: PropTypes.bool,
  sport_id: PropTypes.number,
  season_id: PropTypes.number,
  handleClick: PropTypes.func,
};
export default TopPlayerCard;

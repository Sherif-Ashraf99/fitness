import { getTime, handleNavigateToMatchPage, ImgURL } from "src/utils/globalFn";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { sportsSupportedByTwist2024 } from "src/utils/globalData";
import liveIcon from "src/assets/images/Twist/Live-icon.svg";
import CircleTime from "../../CircleTime";
import apis from "src/services/Twist";
import { useQuery } from "@tanstack/react-query";

const apiMatchEventFn = (params) => apis.match.getMatchEvents(params);

export default function OlympicsCard({ match = {}, isHomeCarousel = false }) {
  let {
    teamOne_logo,
    teamTwo_logo,
    teamOne_name,
    teamTwo_name,
    sport_name,
    status,
    logo,
    bigLogo,
    start_date,
    score,
    id,
    sport_id,
    services,
    matchRoundInfo,
  } = match;

  const {
    data: MatchEventData = [],
    isLoading: isLoadingMatchEvent,
    isError: isErrorMatchEvent,
  } = useQuery({
    queryKey: ["match-event", id],
    queryFn: () => apiMatchEventFn({ match_id: id }),
    enabled: status === "بدأت" && sport_id === 1,
  });

  return (
    <Link
      className={`${styles["olympics-card"]} ${
        isHomeCarousel ? styles["olympicHomeCalender"] : ""
      } ${
        sportsSupportedByTwist2024[sport_id] ? styles["matchClickable"] : ""
      }`}
      to={handleNavigateToMatchPage(id, sport_id, services[0], 731)}
    >
      <div
        className={styles["card-start-part"]}
        style={{ order: `${isHomeCarousel ? "2" : "0"}` }}
      >
        <div className={styles["card-type"]}>
          <img src={ImgURL(logo)} alt="card-type" />
          <span>{sport_name}</span>
        </div>
        {!!teamTwo_name && (
          <figure className={styles["card-player-info"]}>
            <img src={ImgURL(teamOne_logo)} alt="" />
            <figcaption>{teamOne_name}</figcaption>
          </figure>
        )}
      </div>
      <div
        className={styles["card-center-part"]}
        style={{
          "--backgroundImg": `url(${ImgURL(bigLogo)})`,
          order: `${isHomeCarousel ? "1" : "0"}`,
        }}
      >
        <div
          className={styles["card-location"]}
          data-is-single-game={!!teamTwo_name}
        >
          {/* <img src={locationImg} alt='location' />
					<span>سنتياجو برنابيو</span> */}
        </div>
        {sport_id === 1 &&
        status === "بدأت" &&
        !isLoadingMatchEvent &&
        !isErrorMatchEvent ? (
          <div className={`${styles["live-time"]}`}>
            <CircleTime
              data={{
                team1: { score: score.split("-")[0] },
                team2: { score: score.split("-")[1] },
                matchRoundInfo,
              }}
              MatchEventData={MatchEventData}
              isMatchCard={true}
            />
          </div>
        ) : (
          <div className={styles["card-time"]}>
            <div>
              {(status === "بدأت" || status === "انتهت") && teamTwo_name && (
                <span
                  style={{
                    paddingInlineEnd: "15px",
                    display: "inline-block",
                    marginBlockStart: "-20PX",
                  }}
                >
                  {score.split("-")[0]}
                </span>
              )}
              {start_date && !score && (
                <>
                  <span>{getTime(start_date)["time"]}</span>
                  <span>{getTime(start_date)["period"]}</span>
                </>
              )}

              {score && !teamTwo_name && (
                <span className={styles["score-individual-games"]}>
                  {score}
                </span>
              )}
              {(status === "بدأت" || status === "انتهت") && teamTwo_name && (
                <span
                  style={{
                    paddingInlineStart: "15px",
                    display: "inline-block",
                    marginBlockStart: "-20PX",
                  }}
                >
                  {score.split("-")[1]}
                </span>
              )}
            </div>
            {!!teamTwo_name && <span>VS</span>}
            {!teamTwo_name && (
              <figure className={styles["card-player-info"]}>
                <img src={ImgURL(teamOne_logo)} alt="" />
                <figcaption>{teamOne_name}</figcaption>
              </figure>
            )}
          </div>
        )}
      </div>
      <div className={styles["card-end-part"]}>
        {status !== "بدأت" ? (
          <div className={styles["card-status"]}>{status}</div>
        ) : (
          <img src={liveIcon} className={styles["liveIcon"]} alt="liveIcon" />
        )}
        {!!teamTwo_name && (
          <figure className={styles["card-player-info"]}>
            <img src={ImgURL(teamTwo_logo)} alt="" />
            <figcaption>{teamTwo_name}</figcaption>
          </figure>
        )}
      </div>
    </Link>
  );
}

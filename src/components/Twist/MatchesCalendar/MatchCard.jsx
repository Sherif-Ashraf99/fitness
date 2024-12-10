import { MdTv } from "react-icons/md";
import "react-circular-progressbar/dist/styles.css";
import styles from "./MatchCard.module.css";
import { ImgURL, handleNavigateToMatchPage } from "src/utils/globalFn";
import liveIcon from "src/assets/images/Twist/Live-icon.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CircleTime from "../CircleTime";
import { useQuery } from "@tanstack/react-query";
import apis from "src/services/Twist";
import { getUserPhoneNumnberFromCookies } from "src/utils/globalFn";
import { sportsSupportedByTwist2024 } from "src/utils/globalData";

const apiMatchEventFn = (params) => apis.match.getMatchEvents(params);
function MatchCard({ match, handleClickPrediction, predicredMatchesData }) {
  let {
    status,
    tournament,
    stadium,
    channel,
    team1,
    team2,
    date,
    sport_id,
    services = [],
    id,
  } = match ?? {};

  const { data: MatchEventData = [], isLoading: isLoadingMatchEvent } =
    useQuery({
      queryKey: ["match-event", id],
      queryFn: () => apiMatchEventFn({ match_id: id }),
      enabled: status === "بدأت" && sport_id === 1,
    });

  const phoneNum = getUserPhoneNumnberFromCookies("international");

  const isMatchPredicted =
    phoneNum &&
    predicredMatchesData?.some((predicredMatch) => predicredMatch === id);

  if (match === undefined) {
    return (
      <div className={`${styles["not-found"]}`}>
        <h3>لا يوجد مباريات</h3>
      </div>
    );
  }

  return (
    <Link
      className={`${styles["match-card-wrapper"]} ${
        sportsSupportedByTwist2024[sport_id] ? styles["matchClickable"] : ""
      }`}
      to={handleNavigateToMatchPage(id, sport_id, services[0], tournament.id)}
    >
      <div className={`${styles["match-card"]}  match-card`}>
        <div className={`${styles["match-info"]}`}>
          <div className={`${styles["tournament"]}`}>
            <img src={ImgURL(tournament?.logo)} width={20} height={20} alt="" />
            <span>{tournament?.title}</span>
          </div>
          <div
            className={`${styles["status"]} ${
              status === "بدأت" ? styles["live"] : ""
            }`}
          >
            {status === "بدأت" && (
              <img src={liveIcon} width={60} height={60} alt="" />
            )}
            {status !== "بدأت" && <span>{status}</span>}
          </div>
        </div>
        {status !== "بدأت" && (
          <>
            <div className={`${styles["match-teams-info"]}`}>
              <div className={styles["team-info-block"]}>
                <img src={ImgURL(team1?.logo)} height={60} width={60} alt="" />
                <span>{team1?.title.split(" ").slice(0, 3).join(" ")}</span>
              </div>
              <div className={`${styles["versus"]}`}>
                {status === "انتهت" ? (
                  <div className={`${styles["match-result"]}`}>
                    <div className={`${styles["score-team"]}`}>
                      <span>{team1?.score}</span>
                      {team1?.penalty_score ? (
                        <span>{`(${team1?.penalty_score})`}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <span className={`px-1`}>-</span>
                    <div className={`${styles["score-team"]}`}>
                      {team2?.penalty_score ? (
                        <span>{`(${team2?.penalty_score})`}</span>
                      ) : (
                        ""
                      )}
                      <span>{team2?.score}</span>
                    </div>
                  </div>
                ) : (
                  <span>{date?.split(" ")[1].slice(0, -3)}</span>
                )}
                <span>VS</span>
              </div>
              <div className={styles["team-info-block"]}>
                <img src={ImgURL(team2?.logo)} height={60} width={60} alt="" />
                <span>{team2?.title.split(" ").slice(0, 3).join(" ")}</span>
              </div>
            </div>
            {channel?.length !== 0 && (
              <div className={styles["channel"]}>
                <MdTv size={30} />
                <span>{channel[0]?.title}</span>
              </div>
            )}
            {status === "لم تبدأ" && tournament.id === 846 && (
              <button
                disabled={isMatchPredicted}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleClickPrediction({ team1, team2, matchId: id });
                }}
                className={`${styles["predicted-btn"]}`}
              >
                {isMatchPredicted ? "تم ارسال تخمينك" : "خمن واكسب"}
              </button>
            )}
          </>
        )}
        {status === "بدأت" && (
          <div className={`${styles["match-live-info"]}`}>
            <div className={`${styles["live-match-teams-info"]}`}>
              <div className={`${styles["live-team-info"]}`}>
                <img src={ImgURL(team1?.logo)} height={50} width={50} alt="" />
                <span>{team1?.title?.split(" ").slice(0, 3).join(" ")}</span>
              </div>

              {!isLoadingMatchEvent && sport_id === 1 && (
                <div className={`${styles["live-time"]}`}>
                  <CircleTime
                    data={match}
                    MatchEventData={MatchEventData}
                    isMatchCard={true}
                  />
                </div>
              )}

              {sport_id !== 1 && (
                <div className={`${styles["score"]}`}>
                  <span>{team2?.score}</span>
                  <span>-</span>
                  <span>{team1?.score}</span>
                </div>
              )}

              <div className={`${styles["live-team-info"]}`}>
                <img src={ImgURL(team2?.logo)} height={50} width={50} alt="" />
                <span>{team2?.title?.split(" ").slice(0, 3).join(" ")}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

MatchCard.propTypes = {
  match: PropTypes.object,
};

export default MatchCard;

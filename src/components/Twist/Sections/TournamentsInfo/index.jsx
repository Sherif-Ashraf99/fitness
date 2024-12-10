import styles from "./index.module.css";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import apis from "src/services/Twist";
import TournamentsRanking from "../../TournamentsRanking";
import TournamentsStatistics from "../../TournamentsStatistics";
import SectionTitle from "../../shared/SectionTitle";
import TournamentsCarousel from "../../shared/Tournaments/TournamentsCarousel";
import { useState } from "react";
import uefaLogo from "src/assets/images/Twist/uefaLogo.png";

const apiFn = (page, sportId, params) => {
  if (sportId === 7) return apis.squash.getTournaments();
  if (page === "Home")
    return apis.tournaments.getHomeTournamentStanding(params);
  else return apis.tournaments.getTournamentStanding(params);
};

const customizedSquashDataFn = (data) => {
  const customizedSquashData = [...data].map((tournament) => {
    return {
      ...tournament,
      services: [10],
      sport_id: 7,
      title: tournament.name_ar,
    };
  });
  return customizedSquashData;
};
function TournamentsInfo({
  tournament_id,
  sport_id,
  service_id,
  season_id,
  priority,
  competition_type,
  showTeamsCarousel = true,
  isLeague = true,
  handelTabClick,
  page = "",
  isUefaChampionsLeague,
}) {
  const [index, setindex] = useState(0);

  const {
    isLoading,
    isError,
    data = [],
  } = useQuery({
    queryKey: [
      "tournaments-standing",
      tournament_id,
      sport_id,
      service_id,
      season_id,
    ],
    queryFn: () =>
      apiFn(page, sport_id, {
        tournament_id,
        sport_id,
        service_id,
        // season_id,
        priority,
        competition_type,
      }),
    select: (data) => {
      if (sport_id === 7) return customizedSquashDataFn(data);

      if (isLeague) return data;
      if (isUefaChampionsLeague) return data?.[0]?.["Group Stage"]["Group 1"];

      if (!isLeague) {
        const groupStage = data?.[0]?.["Group Stage"];

        if (groupStage) {
          const keysArr = Object.keys(groupStage).sort();
          const values = groupStage[keysArr[index]];
          return {
            keys: keysArr.map((groupName) => ({
              title: groupName,
              logo: data?.[0]?.logo,
            })),

            values,
          };
        } else return [];
      }
    },
    enabled: !!season_id && isLeague !== null,
  });

  const getTournamentData = () => {
    if (page === "Home") return data[index]?.data;

    if (isUefaChampionsLeague)
      return data?.sort((a, b) => b.point - a.point) ?? [];

    if (!isLeague) return data?.values.sort((a, b) => b.point - a.point) ?? [];

    return data[index]?.data?.sort((a, b) => b.point - a.point) ?? [];
  };

  const getIndexTeam = (index) => setindex(index);
  return (
    <>
      {Object?.keys(data).length !== 0 && (
        <section className={styles["tournaments-info"]}>
          <SectionTitle
            title={sport_id !== 1 ? "الترتيب" : "ترتيب / احصائيات"}
          />
          {showTeamsCarousel || (!isLeague && !isUefaChampionsLeague) ? (
            <TournamentsCarousel
              getIndexTeam={getIndexTeam}
              isLoading={isLoading}
              isError={isError}
              data={isLeague ? data : data?.keys}
            />
          ) : (
            <div className={styles["temp-fix-bug"]}></div>
          )}
          {/*i will fix it later 😉*/}
          {isUefaChampionsLeague && (
            <div className={styles["uefa-styles"]}>
              <div>
                <img src={uefaLogo} alt="uefa" />
              </div>
              <span>مرحلة الدوري</span>
            </div>
          )}

          <TournamentsRanking
            isLoading={isLoading}
            isError={isError}
            data={getTournamentData()}
            gridColumn={sport_id !== 1 ? "1/-1" : "1/span 1"}
            handelTabClick={handelTabClick}
            isLeague={isLeague}
            isUefaChampionsLeague={isUefaChampionsLeague}
          />
          {sport_id === 1 && (
            <TournamentsStatistics
              isLoading={isLoading}
              isError={isError}
              data={getTournamentData()}
              gridColumn="2/span 1"
              handelTabClick={handelTabClick}
              isLeague={isLeague}
              isUefaChampionsLeague={isUefaChampionsLeague}
            />
          )}
        </section>
      )}
    </>
  );
}
TournamentsInfo.propTypes = {
  tournament_id: PropTypes.number,
  sport_id: PropTypes.number,
  service_id: PropTypes.number,
  season_id: PropTypes.number,
  priority: PropTypes.number,
  competition_type: PropTypes.number,
  showTeamsCarousel: PropTypes.bool,
  page: PropTypes.string,
};
export default TournamentsInfo;

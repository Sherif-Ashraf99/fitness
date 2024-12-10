import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import apis from "src/services/Twist";
import TopTournamentsCarousel from "./TopTournamentsCarousel";
import { useTranslation } from "react-i18next";
import styles from "./index.module.css";
import SectionTitle from "../shared/SectionTitle";
import ArrowPage from "../ArrowPage";

const apiFn = (sportId, params) => {
  return sportId === 7
    ? apis.squash.getTournaments()
    : apis.tournaments.getTournaments(params);
};

const customizedSquashDataFn = (data) => {
  const customizedSquashData = [...data].map((tournament) => {
    return {
      ...tournament,
      services: [10],
      service_id: 10,
      sport_id: 7,
      title: tournament.name_ar,
    };
  });
  return customizedSquashData;
};

function TopTournaments({ sport_id, service_id, season_id, priority }) {
  const {
    i18n: { dir },
  } = useTranslation();

  const {
    isLoading,
    isError,
    data = [],
  } = useQuery({
    queryKey: ["tournaments", sport_id, service_id, season_id],
    queryFn: () =>
      apiFn(sport_id, { sport_id, service_id, season_id, priority }),
    select: (data) => (sport_id === 7 ? customizedSquashDataFn(data?.data) : data),
    enabled: !!season_id,
  });

  return (
    <section className={styles["top-tournaments"]}>
      <div className={styles["header-tournaments"]}>
      <SectionTitle title='أهم البطولات'/>
      <ArrowPage title={"كل البطولات"} endPoint={"/tournaments"}/>
      </div>

      <TopTournamentsCarousel
        isLoading={isLoading}
        isError={isError}
        data={data}
        dir={dir}
      />
    </section>
  );
}

TopTournaments.propTypes = {
  sport_id: PropTypes.number,
  service_id: PropTypes.number,
  season_id: PropTypes.number,
  priority: PropTypes.number,
};

export default TopTournaments;

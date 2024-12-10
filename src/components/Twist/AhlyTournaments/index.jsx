import styles from "./index.module.css";
import apis from "src/services/Twist/index";
import SectionTitle from "src/components/Twist/shared/SectionTitle/index";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import AhlyTopCarousel from "./AhlyTopCarousel";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";
import { PropTypes } from "prop-types";

function AhlyTournaments({ team_id }) {
  const apiFn = () => apis.teams.getTeamDetails(team_id);

  const {
    i18n: { dir },
  } = useTranslation();
  const { data = [], isLoading } = useQuery({
    queryKey: ["AhlyTournaments"],
    queryFn: apiFn,
  });

  return (
    <>
      <div className={styles["AhlyTournaments"]}>
        <SectionTitle title='البطولات' />
        <AhlyTopCarousel
          isLoading={isLoading}
          data={data.champions}
          dir={dir}
        />
      </div>
    </>
  );
}

AhlyTournaments.propTypes = {
  team_id: PropTypes.string,
};

export default withOnDemandAndErrorBoundary(AhlyTournaments);

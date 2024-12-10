import styles from "./index.module.css";
import { ImgURL } from "src/utils/globalFn";
import useWindowSize from "./../../../hooks/useWindowSize";
import PropTypes from "prop-types";
import InfoTabMobileView from "../InfoTabMobileView";

function AhlyInfoTab({ isLoading, teamInfo }) {
  const { width } = useWindowSize();

  if (isLoading) return <h2>Loading...</h2>;

  const sortByCount = teamInfo?.champions?.sort((a,b) => b.count - a.count)

  return (
    <div className={styles["info-tab"]}>
      <div className={styles["main-section"]}>
        <div>
          <h3>{"تأسس"}</h3>
          <h4>{teamInfo.founded}</h4>
        </div>
        <div>
          <h3>{"استاد"}</h3>
          <h4>{teamInfo.stadium}</h4>
        </div>
        <div>
          <h3>{"رئيس"}</h3>
          <h4>{teamInfo.chairman}</h4>
        </div>
        <div>
          <h3>{"المدير الفني"}</h3>
          <h4>{teamInfo.manager.name}</h4>
        </div>
      </div>
      {width >= "767.98" && (
        <div className={styles["awards-section"]}>
          <table>
            <thead>
            <tr>
            <th>{"اسم البطولة"}</th>
            <th>{"عدد المرات"}</th>
            <th>{"مواسم الفوز"}</th>
            </tr>
            </thead>
            <tbody>
              
              {sortByCount.map((tournament) => (
                <tr key={tournament.tournament_id}>
                  <td>
                    <div className={styles["title-web"]}>
                      <div className={styles["logo"]}>
                        <img
                          src={ImgURL(tournament.logo)}
                          alt={tournament.title}
                        />
                      </div>
                      <span>{tournament.title}</span>
                    </div>
                  </td>
                  <td>{tournament.count}</td>
                  <td>{tournament.seasons}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} {/*web view*/}
      
      {width <= "767.98" && (
        <InfoTabMobileView  isLoading={isLoading} data={teamInfo?.champions}/>
      )} {/*mobile view*/}
      
    </div>
  );
}

AhlyInfoTab.propTypes = {
  isLoading: PropTypes.bool,
  teamInfo: PropTypes.object,
};
export default AhlyInfoTab;

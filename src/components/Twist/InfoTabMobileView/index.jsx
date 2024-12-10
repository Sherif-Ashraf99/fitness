import styles from "./index.module.css";
import { ImgURL } from "src/utils/globalFn";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

function InfoTabMobileView({ isLoading, data }) {
  
  if (isLoading) return <h2>Loading...</h2>;

  const sortByCount = data?.sort((a,b) => b.count - a.count)
  
  return ( <div className={styles["awards-mobile"]}>
          <Accordion>
            {sortByCount?.map(({tournament_id,id,logo,title,name,count,seasons}, i) => (
              <Accordion.Item
                eventKey={i}
                key={tournament_id || id}
              >
                <Accordion.Header>
                  <div className={styles["awards-header"]}>
                    <span>{i + 1}</span>
                    <div className={styles["tournament-title-mob"]}>
                      <div className={styles["tournament-logo"]}>
                        <img
                          src={ImgURL(logo)}
                          alt={title || name}
                        />
                      </div>
                      <span>{title || name}</span>
                    </div>
                    <span>{count}x</span>
                  </div>
                </Accordion.Header>

                <Accordion.Body>{seasons}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
  );
}

InfoTabMobileView.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
};
export default InfoTabMobileView;

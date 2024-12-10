import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import styles from "./index.module.css";
import searchImage from "src/assets/images/Twist/search-icon.svg";
import { useQuery } from "@tanstack/react-query";
import apis from "src/services/Twist";
import { PropagateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { ImgURL, getServiceAndSportRoute } from "src/utils/globalFn";
import avatar from "src/assets/images/Twist/user-icon.png"

const apiFn = (keyword = "",signal) => apis.search.getFullSearch({keyword},signal);
const apiFnTwo = (params) => apis.serviceId.getServiceId(params);
function TheHeaderSearch({ showPlayerSearchModal, setShowPlayerSearchModal }) {
  const navigate = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemSportId, setSelectedItemSportId] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [inputValue, setInputValue] = useState("");
  
  const {
    isLoading,
    isFetching,
    data = [],
  } = useQuery({
    queryKey: ["header-player-search",inputValue],
    queryFn: async ({signal}) => apiFn(inputValue,signal),
    enabled:  !!inputValue,
  });

  useQuery({
    queryKey: ["get-service-id",selectedItemId,selectedItemSportId,selectedItemType],
    queryFn: () => apiFnTwo({ id: selectedItemId, type: selectedItemType }),
    onSuccess: ({ services }) => {
      navigate(
        `${getServiceAndSportRoute(
          services[0],
          selectedItemSportId,
        )}${selectedItemType}/${selectedItemId}/overview`,
      );
      setShowPlayerSearchModal(false);
      setInputValue("")
      setSelectedItemId("")
    },
    enabled: !!selectedItemId && !!selectedItemSportId && !!selectedItemType,
  });

  const handleChange = (e) => {
      setInputValue(e.target?.value
        ?.match(/[A-Za-z ]*[ء-ي]*/g)
        ?.join(""))
  };


  const handlePlayerClick = (sportId, id,type) => {
    setSelectedItemId(id);
    setSelectedItemSportId(sportId);
    setSelectedItemType(type)
  };

  return (
    <Modal
      className={`${styles["player-search-modal"]} player-search-modal`}
      show={showPlayerSearchModal}
      fullscreen={true}>
      <Modal.Body>
        <Form 
        >
          <Form.Group className={`${styles["player-search-form"]} mb-3`}>
            <Form.Control
              type='search'
              placeholder='إبحث هنا'
              onChange={handleChange}
            />
            <span 
            >
              <img src={searchImage} width={15} height={15} alt='' />
            </span>
          </Form.Group>
        </Form>
        {(isLoading || isFetching) && inputValue && (
          <div className={styles["search-list-loader"]}>
            <PropagateLoader color='var(--light-green)' size={15} />
          </div>
        )}

        {!isLoading &&
          !isFetching &&
          !data.length &&
          inputValue && (
            <div className={styles["no-results"]}>لا يوجد نتائج</div>
          )}

        {!isLoading &&
          !isFetching &&
          data.length &&
          inputValue && (
            <ul className={`${styles["search-list"]}`}>
              {data.map(({ sport_id, id, name, image ,type}) => (
                <li key={id} onClick={() => handlePlayerClick(sport_id, id,type)}>
                  <img src={ImgURL(image) || avatar} width='35px' height='35px' alt={name} />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          )}
      </Modal.Body>
    </Modal>
  );
}

TheHeaderSearch.propTypes = {
  showPlayerSearchModal: PropTypes.bool,
  setShowPlayerSearchModal: PropTypes.func,
};

export default TheHeaderSearch;

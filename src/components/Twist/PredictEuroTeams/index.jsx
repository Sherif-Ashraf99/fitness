import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { ImgURL } from "src/utils/globalFn";
import apis from "src/services/Twist";
import { getUserPhoneNumnberFromCookies } from "src/utils/globalFn";
// import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import subscriberImage from "src/assets/images/Twist/subscriber.jpg";
import notSubscriberImage from "src/assets/images/Twist/not-subscriber.jpg";
import { Link, useLocation } from "react-router-dom";
import SubscribeBtn from "src/components/Shared/Subscription/SubscribeBtn";
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";
import { useQueryClient } from "@tanstack/react-query";

export default function PredictEuroTeams({
  show,
  onHide,
  matchId,
  team1,
  team2,
  refetchPredictionFn,
}) {
  const { pathname } = useLocation();
  const [isFetchingPredictAndWinStatus, setIsFetchingPredictAndWinStatus] =
    useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showSubscripedImage, setShowSubscripedImage] = useState(false);
  const [predictAndWinErrors, setPredictAndWinErrors] = useState(null);
  const [formValues, setFormValues] = useState({ team_one: "", team_two: "" });

  const { setRedirectToSubscriptionUI } =
    useCheckSubscriptionByService("international");

  const queryClient = useQueryClient();
  const phoneNum = getUserPhoneNumnberFromCookies("international");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFetchingPredictAndWinStatus(true);
    apis.eurogames
      .sendUserPrediction({
        team_one: +formValues.team_one,
        team_two: +formValues.team_two,
        match_id: matchId,
        msisdn: phoneNum ?? null,
        team_one_id: team1.id,
        team_two_id: team2.id,
      })
      .then((res) => {
        if (res?.data?.status === 201 && phoneNum) {
          setShowSubscripedImage(true);
          queryClient.invalidateQueries(["euro-matches"]);
          queryClient.invalidateQueries(["get-predicted-matches"]);
        } else if ((res?.predicted || res?.data?.status === 201) && !phoneNum) {
          /*not register phone number */
          setShowImage(true);
        } else {
          /* error */
          setPredictAndWinErrors(true);
        }

        setIsFetchingPredictAndWinStatus(false);
      });
  };

  useEffect(() => {
    if (!show) {
      setShowSubscripedImage(false);
      setShowImage(false);
      setPredictAndWinErrors(null);
      setFormValues({ team_one: "", team_two: "" });
    }
  }, [show]);

  return (
    <div className={styles["PredictEuroTeams"]}>
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        centered
        className={styles["modal-euro"]}
      >
        <Modal.Header
          className={styles["modal-euro-header"]}
          closeButton={true}
        />
        <Modal.Body className={styles["modal-euro-body"]}>
          <div className="container">
            <h4>توقع النتيجة واكسب مع تويست سبورتس</h4>
            <div className={styles["teams-wrapper"]}>
              {!!phoneNum && !showSubscripedImage && (
                <form
                  className={styles["predict-resultForm"]}
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex justify-content-around align-items-center mb-4">
                    <div className="d-flex flex-column align-items-center">
                      <figure className="d-flex flex-column align-items-center mb-4">
                        <img src={ImgURL(team1.logo)} alt="" />
                        <figcaption className="mt-3">{team1.title}</figcaption>
                      </figure>
                      <div className={styles["select__wrapper"]}>
                        <select
                          id="match-result"
                          name="team_one"
                          value={formValues.team_one}
                          onChange={handleChange}
                        >
                          <option value="">اختر هنا</option>
                          {[...Array(11).keys()].map((ele) => (
                            <option key={ele} value={ele}>
                              {ele}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <figure className="d-flex flex-column align-items-center mb-4">
                        <img src={ImgURL(team2.logo)} alt="" />
                        <figcaption className="mt-3">{team2.title}</figcaption>
                      </figure>
                      <div className={styles["select__wrapper"]}>
                        <select
                          id="match-result"
                          name="team_two"
                          value={formValues.team_two}
                          onChange={handleChange}
                        >
                          <option value="">اختر هنا</option>
                          {[...Array(11).keys()].map((ele) => (
                            <option key={ele} value={ele}>
                              {ele}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles["button__wrapper"]} my-2 text-center d-flex flex-column justify-content-center align-items-center`}
                  >
                    <Button
                      disabled={
                        isFetchingPredictAndWinStatus ||
                        !formValues.team_two ||
                        !formValues.team_one
                      }
                      type="submit"
                      className="text-capitalize"
                    >
                      {isFetchingPredictAndWinStatus ? <Spinner /> : "إرسال"}
                    </Button>
                  </div>
                </form>
              )}
              {!isFetchingPredictAndWinStatus && showSubscripedImage && (
                <div
                  className={`${styles["success-text"]}  flex-column align-items-center`}
                >
                  <img src={subscriberImage} alt="" className={styles["win"]} />
                  <p>تم إرسال توقعك</p>
                </div>
              )}
              {!isFetchingPredictAndWinStatus && predictAndWinErrors && (
                <div className="text-center my-5 text-white d-flex flex-column justify-content-center">
                  حدث خطا يرجي اعادة المحاولة
                </div>
              )}
              {!phoneNum && (
                <div className="justify-content-center">
                  <div className="my-5">
                    {/* <LoadingSpinner
                      p={3}
                      fs={"md"}
                      loadingText="يتم الإرسال ..."
                    /> */}
                  </div>
                  {!isFetchingPredictAndWinStatus &&
                    !showImage &&
                    !predictAndWinErrors && (
                      <div>
                        <form
                          className={styles["predict-resultForm"]}
                          onSubmit={handleSubmit}
                        >
                          <div className="d-flex justify-content-around align-items-center mb-4">
                            <div className="d-flex flex-column align-items-center">
                              <figure className="d-flex flex-column align-items-center mb-4">
                                <img src={ImgURL(team1.logo)} alt="" />
                                <figcaption className="mt-3">
                                  {team1.title}
                                </figcaption>
                              </figure>
                              <div className={styles["select__wrapper"]}>
                                <select
                                  id="match-result"
                                  name="team_one"
                                  value={formValues.team_one}
                                  onChange={handleChange}
                                >
                                  <option value="">اختر هنا</option>
                                  {[...Array(11).keys()].map((ele) => (
                                    <option key={ele} value={ele}>
                                      {ele}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                              <figure className="d-flex flex-column align-items-center mb-4">
                                <img src={ImgURL(team2.logo)} alt="" />
                                <figcaption className="mt-3">
                                  {team2.title}
                                </figcaption>
                              </figure>
                              <div className={styles["select__wrapper"]}>
                                <select
                                  id="match-result"
                                  name="team_two"
                                  value={formValues.team_two}
                                  onChange={handleChange}
                                >
                                  <option value="">اختر هنا</option>
                                  {[...Array(11).keys()].map((ele) => (
                                    <option key={ele} value={ele}>
                                      {ele}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${styles["button__wrapper"]} my-2 text-center d-flex flex-column justify-content-center align-items-center`}
                          >
                            <Button
                              type="submit"
                              className="text-capitalize predictAfconAndWin-submit-button"
                              disabled={
                                isFetchingPredictAndWinStatus ||
                                !formValues.team_two ||
                                !formValues.team_one
                              }
                            >
                              {isFetchingPredictAndWinStatus ? (
                                <Spinner />
                              ) : (
                                "إرسال"
                              )}
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}
                  {!isFetchingPredictAndWinStatus && showImage && (
                    <div className="d-flex  flex-column align-items-center">
                      <img
                        src={notSubscriberImage}
                        alt=""
                        className={styles["win"]}
                      />
                      {/* <Link
                        className={styles["subscribe-btn"]}
                        to={{
                          pathname: `/${"international"}/subscription`,
                          state: {
                            previousPathname: pathname,
                          },
                        }}
                      >
                        إشترك
                      </Link> */}
                      <SubscribeBtn
                        setRedirectToSubscriptionUI={
                          setRedirectToSubscriptionUI
                        }
                        name={"اشترك في خدمة الكرة العالمية"}
                      />
                    </div>
                  )}
                  {!isFetchingPredictAndWinStatus && predictAndWinErrors && (
                    <div className="text-center my-5 text-white d-flex flex-column justify-content-center">
                      حدث خطا يرجي اعادة المحاولة
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

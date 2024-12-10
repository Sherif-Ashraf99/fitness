import React, { useState } from "react";
import { convertFullDate, getTime, ImgURL } from "src/utils/globalFn";
import stadiumIcon from "src/assets/images/Twist/stadiumIcon.png";
import calendar from "src/assets/images/Twist/Calendar.svg";
import soccerBall from "src/assets/images/Twist/SoccerBall.svg";
import styles from "./index.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Skeleton from "react-loading-skeleton";

const PreviousMatches = ({ latestData, isError, isLoading }) => {
  const [toggle, setToggle] = useState({});

  const handleToggle = (matchId) => {
    setToggle((prev) => ({
      ...prev,
      [matchId]: !prev[matchId],
    }));
  };
  if (isError)
    return (
      <h3 className="text-center">حدث خطأ يرجى إعادة المحاوله مرة اخرى</h3>
    );
  return (
    <div className={styles.previousMatches}>
      <h5>اللقاءات السابقة بين الفريقين </h5>
      {isLoading
        ? [...Array(4).keys()].map((key) => <Skeleton key={key} height={200} />)
        : latestData?.map((lastMatch) => {
            const { tournament, stadium, date, team1, team2, id } = lastMatch;
            let team1Goals = team1?.goals[0]?.playerOne_name;
            let team2Goals = team2?.goals[0]?.playerOne_name;
            return (
              <div className={styles.previousMatch} key={id}>
                <div className={styles.header}>
                  <span>
                    <img
                      height={24}
                      src={ImgURL(tournament?.logo)}
                      alt="tournament-logo"
                    />
                    {tournament?.title}
                  </span>
                  {stadium && (
                    <span>
                      <img width={24} src={stadiumIcon} alt="stadium-Icon" />
                      {stadium}
                    </span>
                  )}
                  <span>
                    <img width={24} src={calendar} alt="calendar-Icon" />
                    <span className="ms-2">{convertFullDate(date)}</span>
                    <span>
                      {getTime(date).time} {getTime(date).period}
                    </span>
                  </span>
                </div>
                <div className={styles.teamsContainer}>
                  <div>
                    <img width={60} src={ImgURL(team1?.logo)} alt="team-logo" />
                  </div>
                  <span style={{ background: team1.first_color }}>
                    {team1?.name}
                  </span>
                  <span>
                    {team1?.score} - {team2?.score}
                  </span>
                  <span style={{ background: team2.first_color }}>
                    {team2?.name}
                  </span>
                  <div>
                    <img width={60} src={ImgURL(team2?.logo)} alt="team-logo" />
                  </div>
                </div>
                <div className="d-flex justify-content-around mt-4 gap-4">
                  <div>
                    {toggle[id] ? (
                      team1.goals.map((player, i) => {
                        return (
                          <div className="mb-2" key={i}>
                            <img
                              className="ms-2"
                              src={soccerBall}
                              alt="Soccer-Ball"
                            />
                            {player.playerOne_name}
                          </div>
                        );
                      })
                    ) : (
                      <div className="mb-2">
                        {team1Goals && (
                          <img
                            className="ms-2"
                            src={soccerBall}
                            alt="Soccer-Ball"
                          />
                        )}
                        {team1Goals}
                      </div>
                    )}
                  </div>
                  <div>
                    {toggle[id] ? (
                      team2.goals.map((player, i) => {
                        return (
                          <div className="mb-2" key={i}>
                            <img
                              className="ms-2"
                              src={soccerBall}
                              alt="Soccer-Ball"
                            />
                            {player.playerOne_name}
                          </div>
                        );
                      })
                    ) : (
                      <div className="mb-2">
                        {team2Goals && (
                          <img
                            className="ms-2"
                            src={soccerBall}
                            alt="Soccer-Ball"
                          />
                        )}
                        {team2Goals}
                      </div>
                    )}
                  </div>
                </div>
                <div className="position-relative d-flex justify-content-center">
                  <span
                    className={styles.toggleIcon}
                    onClick={() => handleToggle(id)}
                  >
                    {toggle[id] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
              </div>
            );
          })}
      {latestData?.length === 0 && (
        <div
          className={`${styles.noData} d-flex justify-content-center align-items-center bg-white bg-opacity-10`}
        >
          <h3 className="fw-bold">لا يوجد مبارايات سابقة</h3>
        </div>
      )}
    </div>
  );
};

export default PreviousMatches;

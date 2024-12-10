import styles from "./index.module.css";
import PropTypes from "prop-types";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { ImgURL } from "src/utils/globalFn";
import { useEffect, useState } from "react";
import useWindowSize from "src/hooks/useWindowSize";

let interval;

const clearIntervalFn = () => clearInterval(interval);

function convertDateFormat(originalDate) {
  const date = new Date(originalDate);
  // Extract year, month, and day
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);
  // Extract hour, minute, and second // Note that +2 for winter time and +3 for summer time
  const hour = ("0" + (date.getUTCHours() + 2)).slice(-2);
  const minute = ("0" + date.getUTCMinutes()).slice(-2);
  const second = ("0" + date.getUTCSeconds()).slice(-2);
  // Format the date string
  const formattedDate = `${year}-${month}-${day} ${
    hour - 1
  }:${minute}:${second}`;
  return formattedDate;
}

const calculateRoundTimeByMatchStatus = (
  eventTimeCreated,
  startMinute,
  endMinute,
  title,
  eventOverTime,
  isMatchCard,
  isOriginalTime,
  isNewCalender
) => {
  const currentTime = new Date();
  const eventTimeByMilliSeconds = Date.parse(eventTimeCreated);
  const difference = currentTime - eventTimeByMilliSeconds;
  const elapsedMinutes = (startMinute + Math.floor(difference / 1000 / 60))
    .toString()
    .padStart(2, "0");

  if (isOriginalTime && +elapsedMinutes < endMinute) {
    return {
      minutes: elapsedMinutes,
      seconds: Math.floor((difference / 1000) % 60)
        .toString()
        .padStart(2, "0"),
      maxRoundValue: endMinute,
      title: !isMatchCard && !isNewCalender ? title : "",
    };
  } else {
    clearIntervalFn();
    return {
      minutes: endMinute,
      seconds: "00",
      maxRoundValue: endMinute,
      title: !isMatchCard && !isNewCalender ? title : "",
      overtime:
        eventOverTime?.split("+")[1] &&
        (isNewCalender || !isMatchCard) &&
        `${eventOverTime?.split("+")[1]}+`,
    };
  }
};

const displayRoundTimeByMatchStatus = (
  eventId,
  eventTimeCreated,
  overTime,
  isMatchCard,
  isNewCalender
) => {
  if (eventId === 1) {
    return calculateRoundTimeByMatchStatus(
      eventTimeCreated,
      0,
      45,
      "الشوط الأول",
      undefined,
      isMatchCard,
      true,
      isNewCalender
    );
  } else if (eventId === 2) {
    return calculateRoundTimeByMatchStatus(
      eventTimeCreated,
      undefined,
      45,
      "نهاية الشوط الأول",
      overTime,
      isMatchCard,
      false,
      isNewCalender
    );
  } else if (eventId === 3) {
    return calculateRoundTimeByMatchStatus(
      eventTimeCreated,
      45,
      90,
      " الشوط الثاني",
      undefined,
      isMatchCard,
      true,
      isNewCalender
    );
  } else if (eventId === 4) {
    return calculateRoundTimeByMatchStatus(
      eventTimeCreated,
      undefined,
      90,
      "نهاية الشوط الثاني",
      overTime,
      isMatchCard,
      false,
      isNewCalender
    );
  } else if (eventId === 5) {
    return calculateRoundTimeByMatchStatus(
      eventTimeCreated,
      90,
      105,
      " الشوط الأضافي الأول",
      undefined,
      isMatchCard,
      true,
      isNewCalender
    );
  } else if (eventId === 6) {
    return calculateRoundTimeByMatchStatus(
      eventTimeCreated,
      undefined,
      105,
      "نهاية الشوط الأضافي الأول",
      overTime,
      isMatchCard,
      false,
      isNewCalender
    );
  } else if (eventId === 7) {
    return calculateRoundTimeByMatchStatus(
      eventTimeCreated,
      105,
      120,
      " الشوط الأضافي الثاني",
      undefined,
      isMatchCard,
      true,
      isNewCalender
    );
  } else if (eventId === 8) {
    return calculateRoundTimeByMatchStatus(
      eventTimeCreated,
      undefined,
      120,
      "نهاية الشوط الأضافي الثاني",
      overTime,
      isMatchCard,
      false,
      isNewCalender
    );
  } else if (eventId === 10) {
    return calculateRoundTimeByMatchStatus(
      eventTimeCreated,
      undefined,
      120,
      "بداية الضربات الترجيحية",
      undefined,
      isMatchCard,
      false,
      isNewCalender
    );
  }

  return {};
};

const getTotalTime = (event_time) => {
  const hasOverTime = !!event_time?.includes("+");
  const basicTime = hasOverTime ? +event_time.split("+")[0] : +event_time;
  const overTime = hasOverTime ? +event_time.split("+")[1] : 0;
  const totalTime = basicTime + overTime;
  return totalTime;
};

const specificEventsForShowImage = [
  15, 16, 20, 21, 24,
]; /* 15 = 2 yellow cards , 16 = red card , 20 = Goal Penalty , 21 = own goal , 24 = goal */

const getTimedEvents = (eventsArr, maxEventTime) => {
  const eventsMin = Array.from({ length: maxEventTime });

  eventsArr?.map((event) => {
    const totalTime = getTotalTime(event.event_time);
    return specificEventsForShowImage.includes(event?.event_id)
      ? eventsMin.splice(totalTime, 1, event)
      : eventsMin;
  });
  return eventsMin;
};

function CircleTime({
  data,
  MatchEventData,
  isMatchCard = true,
  isNewCalender = false,
  isNewMatchPage = false,
}) {
  let { team1, team2, matchRoundInfo = [] } = data;
  const { width } = useWindowSize();
  const isMobileView = width < 1200;

  // matchRoundInfo = [
  //   { created_at: "2024-09-18T14:04:33.000000Z", event_id: 2, time: "45+5" },
  // ];
  const { created_at, event_id, time } = matchRoundInfo[0] ?? {};
  const eventTimeCreated = convertDateFormat(created_at);

  const calcCorrectUiDistance = () => {
    if (isNewMatchPage) return "2.5rem";
    if (isNewCalender && !isMobileView) return "1.5rem";
    if (isNewCalender && isMobileView) return "2.13rem";
    return isMatchCard ? "3rem" : "4.3rem";
  };

  const [roundTime, setRoundTime] = useState(
    displayRoundTimeByMatchStatus(
      event_id,
      eventTimeCreated,
      time,
      isMatchCard,
      isNewCalender
    )
  );

  const maxEventTime = MatchEventData?.reduce((prev, curr) => {
    const totalTime = getTotalTime(curr.event_time);
    if (totalTime > prev) prev = totalTime;
    return prev;
  }, roundTime.maxRoundValue);

  useEffect(() => {
    interval = setInterval(() => {
      setRoundTime(
        displayRoundTimeByMatchStatus(
          event_id,
          eventTimeCreated,
          time,
          isMatchCard,
          isNewCalender
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [matchRoundInfo]);

  return (
    <div
      className={`${styles["live"]} ${
        isNewCalender ? styles["calender-style"] : ""
      }
       ${isNewMatchPage ? styles["match-page"] : ""}    
      `}
    >
      {!!Object.keys(roundTime).length && (
        <CircularProgressbarWithChildren
          strokeWidth={4}
          value={roundTime.minutes}
          maxValue={roundTime.maxRoundValue}
          styles={buildStyles({
            pathTransitionDuration: 1,
          })}
        >
          {roundTime.title && (
            <span className={styles["round-name"]}>{roundTime.title}</span>
          )}
          <span
            className={styles["stop-watch"]}
          >{`${roundTime.seconds} : ${roundTime.minutes}`}</span>
          {!isNewCalender && !isNewMatchPage && (
            <span className={styles["score"]}>
              {team1.score} - {team2.score}
            </span>
          )}
          {roundTime.overtime && (
            <span className={styles["over-time"]}>{roundTime.overtime}</span>
          )}
          <div className={`${styles["top-event"]}`}>
            {getTimedEvents(MatchEventData, maxEventTime)?.map(
              (e, i) =>
                specificEventsForShowImage.includes(e?.event_id) && (
                  <img
                    src={ImgURL(e.event_image)}
                    alt={e.event_name}
                    key={i}
                    style={{
                      transform: `rotate(${
                        i * (360 / maxEventTime)
                      }deg) translateX(${calcCorrectUiDistance()})`,
                    }}
                  />
                )
            )}
          </div>
        </CircularProgressbarWithChildren>
      )}
    </div>
  );
}

CircleTime.propTypes = {
  data: PropTypes.object,
  MatchEventData: PropTypes.array,
  isMatchCard: PropTypes.bool,
  isNewCalender: PropTypes.bool,
  isNewMatchPage: PropTypes.bool,
};

export default CircleTime;

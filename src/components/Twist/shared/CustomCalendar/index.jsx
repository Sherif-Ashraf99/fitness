import styles from "./index.module.css";
import { useState } from "react";
import useWindowSize from "src/hooks/useWindowSize";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { MdClose } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

const CustomCalendar = ({
  selectedCalendarDate,
  setSelectedCalendarDate,
  matchesDaysArr,
  openDirection = "right",
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const windowSize = useWindowSize();

  const handleOnCalendarClick = (e) => {
    const calendarDate = new Date(e);
    setSelectedCalendarDate(calendarDate);
  };

  const setBusyTileStyle = (tileDate) => {
    const date = new Date(tileDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return matchesDaysArr?.includes(formattedDate) ? "busy-tile" : "";
  };

  return (
    <div>
      {isCalendarOpen && windowSize.width < 500 && (
        <div
          className={`${styles["calendar"]} d-flex align-items-center gap-1`}
        >
          {/* Calender that appears in mobile view */}
          <div
            className={`${styles["overlay"]}`}
            onClick={() => setIsCalendarOpen(false)}
          ></div>
          <div className={`${styles["header"]}`}>
            <span>
              <MdClose
                onClick={() => {
                  setIsCalendarOpen(false);
                }}
              />
            </span>
            <span>{"اختر اليوم"}</span>
          </div>
          <Calendar
            activeStartDate={selectedCalendarDate}
            onActiveStartDateChange={(e) =>
              handleOnCalendarClick(e.activeStartDate)
            }
            onChange={(e) => handleOnCalendarClick(e)}
            onClickDay={() => setIsCalendarOpen(false)}
            tileClassName={(e) => setBusyTileStyle(e.date)}
            calendarType="Arabic"
          />
        </div>
      )}

      <div
        className={`${styles["calendar"]} ${
          openDirection == "right" ? styles["right"] : styles["left"]
        }  d-flex align-items-center gap-1`}
      >
        {/* Calender that appears in desktop view */}
        {isCalendarOpen && windowSize.width >= 500 && (
          <Calendar
            activeStartDate={selectedCalendarDate}
            onActiveStartDateChange={(e) =>
              handleOnCalendarClick(e.activeStartDate)
            }
            onChange={(e) => handleOnCalendarClick(e)}
            onClickDay={() => setIsCalendarOpen(false)}
            tileClassName={(e) => setBusyTileStyle(e.date)}
            calendarType="Arabic"
          />
        )}
        <FaCalendarAlt
          className={styles["calendar-icon"]}
          onClick={() => setIsCalendarOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default CustomCalendar;

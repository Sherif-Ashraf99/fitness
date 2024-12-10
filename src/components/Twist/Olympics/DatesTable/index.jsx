import Table from "react-bootstrap/Table";
import styles from "./index.module.css";
import apis from "src/services/Olympics";
import { useQuery } from "@tanstack/react-query";
import { Children, useContext } from "react";
import { getDayNameAndNumber } from "./helper";
import regularEventIcon from "./regularEvent.svg";
import medalEventIcon from "./medalEvent.svg";
import { useNavigate } from "react-router-dom";
import { sharedComponentsContext } from "src/context/shared-context";

const apiFn = () => apis.medals.getSportMonthlyCalendarMedals();

export default function DatesTable() {
  const navigate = useNavigate()
  const { setOlympicsTabKey } = useContext(sharedComponentsContext);

  const handleNavigateToSportPage = (id) => {
    navigate(`/olympics/sports-egyptians/${id}`)
    setOlympicsTabKey("sports-egyptians")
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["olympics-sport-monthly-calendar-medals"],
    queryFn: () => apiFn(),
  });

  if (isLoading || isError) return;

  const handleMouseEnter = (num) => {
    const elements = document.querySelectorAll(`[data-num='${num}']`);
    elements.forEach((element, index) => {
      if (!index) element.classList.add(styles.borderExceptBottom);
      else if (index === elements.length - 1)
        element.classList.add(styles.borderExceptTop);
      else element.classList.add(styles.borderLeftRight);
    });
  };

  const handleMouseLeave = () => {
    const elements = document.querySelectorAll("[data-num]");
    elements.forEach((element) => {
      element.classList.remove(
        styles.borderExceptBottom,
        styles.borderExceptTop,
        styles.borderLeftRight
      );
    });
  };

  return (
    <section className={styles["dates-table-section"]}>
      <div className={styles["medal-regular-Wrapper"]}>
        <div>
          <img
            src={regularEventIcon}
            alt="regular-event-icon"
            className={styles["event-icon"]}
          />
          <span>تحديد مركز</span>
        </div>
        <div>
          <img
            src={medalEventIcon}
            alt="medal-event-icon"
            className={styles["event-icon"]}
          />
          <span>تحديد ميدالية</span>
        </div>
      </div>
      <Table className={styles["dates-table"]} responsive borderless hover>
        <thead>
          <tr className={styles["table-top-head"]}>
            <th>يوليو</th>
            <th>أغسطس</th>
          </tr>
          <tr>
            <th>
              <span>الرياضة</span>
            </th>
            {Children.toArray(
              data[0].calendar.map(({ date }, index) => (
                <th
                  data-num={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span>{getDayNameAndNumber(date)["dayNumber"]}</span>
                  <span>{getDayNameAndNumber(date)["dayName"]}</span>
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {Children.toArray(
            data.map(({ title, calendar,id }) => (
              <tr onClick={() => handleNavigateToSportPage(id)}>
                <td>
                  <span>{title}</span>
                </td>
                {Children.toArray(
                  calendar.map(({ regularEvent, getMedals }, index) => (
                    <td
                      data-num={index}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {regularEvent && (
                        <img
                          src={regularEventIcon}
                          alt="regular-event-icon"
                          className={styles["event-icon"]}
                        />
                      )}
                      {getMedals && (
                        <img
                          src={medalEventIcon}
                          alt="medal-event-icon"
                          className={styles["event-icon"]}
                        />
                      )}
                    </td>
                  ))
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </section>
  );
}

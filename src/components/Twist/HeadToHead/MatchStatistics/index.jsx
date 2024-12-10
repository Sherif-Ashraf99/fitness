import React from "react";
import styles from "./index.module.css";
import { ImgURL } from "src/utils/globalFn";

const MatchStatistics = ({ id, stats, isError, isLoading }) => {
  if (isError)
    return (
      <h3 className="text-center">حدث خطأ يرجى إعادة المحاوله مرة اخرى</h3>
    );
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (stats.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center bg-white bg-opacity-10 p-5">
        <h3 className="fw-bold">لا يوجد إحصائيات سابقة</h3>
      </div>
    );
  }
  return (
    <div className={styles.matchStatistics}>
      <div className={styles.header}>
        <div>
          <img
            className="mx-2"
            width={46}
            height={46}
            src={ImgURL(stats[0]?.team_logo)}
            alt="team-logo"
          />
          <span>{stats[0]?.team_name}</span>
        </div>
        <div>
          <span className={styles.title}>احصائيات المباريات</span>
        </div>
        <div>
          <span>{stats[1]?.team_name}</span>
          <img
            className="mx-2"
            width={46}
            height={46}
            src={ImgURL(stats[1]?.team_logo)}
            alt="team-logo"
          />
        </div>
      </div>
      <div className={styles.body}>
        <div>
          <span>{stats[0]?.total_target_shots}</span>
          <span> تسديدات علي المرمي </span>
          <span>{stats[1]?.total_target_shots}</span>
        </div>
        <div>
          <span>{stats[0]?.total_passes}</span>
          <span> تمريرات </span>
          <span>{stats[1]?.total_passes}</span>
        </div>
        <div>
          <span>{stats[0]?.total_yellow_cards}</span>
          <span> الكروت الصفراء </span>
          <span>{stats[1]?.total_yellow_cards}</span>
        </div>
        <div>
          <span>{stats[0]?.total_red_cards}</span>
          <span> الكروت الحمراء </span>
          <span>{stats[1]?.total_red_cards}</span>
        </div>
      </div>
    </div>
  );
};

export default MatchStatistics;

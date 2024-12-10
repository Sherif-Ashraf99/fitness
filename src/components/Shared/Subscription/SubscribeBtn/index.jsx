import { ImgURL } from "src/utils/globalFn";
import styles from "./index.module.css";

const SubscribeBtn = ({ setRedirectToSubscriptionUI, data , name }) => {
  const { title, media, video_cover } = data ?? {};

  if (data === undefined) {
    return (
      <div className={styles["show-more"]}>
        <button
          className={styles["subscibe-btn"]}
          onClick={() => setRedirectToSubscriptionUI(true)}
        >
          {name ? name : "لمشاهدة المزيد يرجي تسجيل الدخول"} 
        </button>
      </div>
    );
  }

  
  return (
    <section className={styles["subscibe"]}>
      <h4>{title}</h4>

      <div
        className={styles["subscibe-details"]}
        style={{ backgroundImage: `url(${ImgURL(video_cover || media)})` }}
      >
        <div className={styles["subscibe-login"]}>
          <h5>اقرأ المقال كاملاً</h5>
          <span>
            يتيح لك اشتراكك الوصول إلى جميع المقالات السابقة والمستقبلية
          </span>
          <button
            className={styles["subscibe-btn"]}
            onClick={() => setRedirectToSubscriptionUI(true)}
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubscribeBtn;

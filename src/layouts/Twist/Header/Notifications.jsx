import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import styles from "./Notifications.module.css";
import etisalatLogo from "src/assets/images/Shared/etisalatLogo.png";
import notificationBing from "src/assets/images/Shared/notificationBing.svg";
import { IoIosNotifications } from "react-icons/io";

function Notifications() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const [show, setShow] = useState(isHomePage);
  const toggleShow = () => setShow(!show);

  return (
    <div className={styles["header-notifications"]}>
      <Button onClick={toggleShow} className="mb-2">
        <figure>
          <IoIosNotifications className={styles.notifications} />
        </figure>
        <span>1</span>
      </Button>
      <div className={styles["toast-container"]}>
        <Toast show={show} onClose={toggleShow}>
          <Toast.Body>
            <div className={styles["toast-message-container"]}>
              <div>
                <div className={styles["headerSubscribe"]}>
                  <h2>اشترك في خدمات تويست سبورتس</h2>
                  <div className={styles["notificationBing"]}>
                    <img
                      src={notificationBing}
                      width={17}
                      height={17}
                      alt="notificationBing"
                    />
                  </div>
                </div>

                <div className={styles["descriptionWrapper"]}>
                  <div className={styles["content"]}>
                    <p>
                      اشترك الان واستمتع بأخبار وخدمات الكرة العالمية والمحلية
                      وفيتنس وكمان ملوك الكورة و الرياضات الأخرى.
                    </p>
                    <p>حصريا لعملاء اتصالات.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["buttonsLogoWapper"]}>
              <div className={styles["toast-buttons-container"]}>
                <Button onClick={() => navigate("/twist-services")}>
                  المزيد
                </Button>
                <Button onClick={toggleShow}>ليس الأن</Button>
              </div>
              <img
                src={etisalatLogo}
                width={50}
                height={50}
                alt="etisalatLogo"
              />
            </div>
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default Notifications;

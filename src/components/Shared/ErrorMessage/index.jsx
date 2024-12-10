import styles from "./index.module.css";
import PropTypes from "prop-types";

function ErrorMessage({ customStyles = {} }) {
  const { height = "10rem", gridColumn = "1/-1" } = customStyles;
  return (
    <div className={styles["error-message"]} style={{ height, gridColumn }}>
      حدث خطأ يرجى إعادة المحاولة
    </div>
  );
}

ErrorMessage.propTypes = {
  customStyles: PropTypes.object,
};

export default ErrorMessage;

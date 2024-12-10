import Skeleton from "react-loading-skeleton";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";

function TwistMatchCardSkeleton() {
  const { id } = useParams();

  return (
    <div
      className={`${styles["twist-match-card-skeleton"]} ${
        id === "6631" && styles["al-ahly-page"]
      }`}>
      <div className={styles["card-header"]}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      <div className={styles["card-body"]}>
        <Skeleton />
      </div>
      <div className={styles["card-footer"]}>
        <Skeleton circle />
        <Skeleton />
        <Skeleton circle />
      </div>
    </div>
  );
}

export default TwistMatchCardSkeleton;

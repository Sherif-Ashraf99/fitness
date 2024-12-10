import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import { BounceLoader } from "react-spinners";

export default function SectionSkeleton() {
  const { id } = useParams();
  const loaderColor = id === "6631" ? "var(--Suva-Grey)" : "var(--cool-black)";
  return (
    <div
      className={`${styles["section-skeleton"]} ${
        id === "6631" && styles["al-ahly-page"]
      }`}
      style={{ height: `${id === "6631" && "12rem"}` }}>
      <BounceLoader color={loaderColor} />
    </div>
  );
}

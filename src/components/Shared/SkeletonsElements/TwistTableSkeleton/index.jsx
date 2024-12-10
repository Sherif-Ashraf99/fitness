import { Table } from "react-bootstrap";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";

function TwistTableSkeleton({ rowsNumbers = 6 }) {
  const { id } = useParams();

  return (
    <div
      className={`${styles["twist-table-skeleton"]} ${
        id === "6631" && styles["al-ahly-page"]
      }`}>
      <Table borderless>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(rowsNumbers).keys()].map((key) => (
            <tr key={key}>{!(key % 2) && <Skeleton />}</tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

TwistTableSkeleton.propTypes = {
  rowsNumbers: PropTypes.number,
};

export default TwistTableSkeleton;

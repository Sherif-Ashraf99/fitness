import { Table } from "react-bootstrap";
import styles from "./AhlyRankingTable.module.css";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

function AhlyRankingTable({ data }) {
  const sortByPoint = data?.sort((a, b) => b.point - a.point);

  return (
    <div className={styles["ranking-table"]}>
      <Table borderless hover>
        <thead>
          <tr>
            <th>
              <span>المركز</span>
            </th>
            <th>
              <span>فريق</span>
            </th>
            <th>
              <span>فوز</span>
            </th>
            <th>
              <span>خسارة</span>
            </th>
            <th>
              <span>تعادل</span>
            </th>

            <th>
              <span>فارق</span>
            </th>
            <th>
              <span>نقاط</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortByPoint.slice(0, 5).map((team, i) => (
            <tr key={i}>
              <td>
                <span className={`cpe-3`}>{i + 1}</span>
              </td>

              <td>
                <span>{team.team_name}</span>
              </td>
              <td>
                <span>{team.win}</span>
              </td>
              <td>
                <span>{team.lose}</span>
              </td>
              <td>
                <span>{team.draw}</span>
              </td>
              <td>
                <span>{team.difference}</span>
              </td>
              <td>
                <span>{team.point}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

AhlyRankingTable.propTypes = {
  data: PropTypes.array,
};

export default withErrorBoundary(AhlyRankingTable);

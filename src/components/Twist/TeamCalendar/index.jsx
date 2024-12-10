import { Col, Nav, Row, Tab } from "react-bootstrap";
import styles from "./index.module.css";
import apis from "src/services/Twist";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";
import MatchCard from "src/components/Twist/MatchesCalendar/MatchCard.jsx";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";

const apiFn = (params) => apis.calendar.getTeamCalender(params);

function TeamCalendar({ team_id }) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["MatchCalendar"],
    queryFn: () =>
      apiFn({
        team_id: team_id,
      }),
  });

  if (isLoading)
    return (
      <div
        className={`${styles["match-card-loader"]} ${
          team_id === "6631" && styles["al-ahly-page"]
        }`}>
        <SkeletonsElements type='twistMatchCard' />
      </div>
    );

  return (
    <div className={`${styles["matches-calendar"]} my-3`}>
      <Tab.Container defaultActiveKey='today'>
        <Row className={`${styles["main"]} `}>
          <Col sm={12}>
            <Nav className='d-flex justify-content-center'>
              <Nav.Item className={`mx-1 mx-md-4 mb-3`}>
                <Nav.Link
                  eventKey='previous'
                  className={`${styles["matches-calendar-day"]}`}>
                  <div className='text-center fs-xs mt-2'>
                    <strong>السابقة</strong>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={`mx-1 mx-md-4 mb-3`}>
                <Nav.Link
                  eventKey='today'
                  className={`${styles["matches-calendar-day"]}`}>
                  <div className='text-center fs-xs mt-2'>
                    <strong>اليوم</strong>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={`mx-1 mx-md-4 mb-3`}>
                <Nav.Link
                  eventKey='next'
                  className={`${styles["matches-calendar-day"]}`}>
                  <div className='text-center fs-xs mt-2'>
                    <strong>القادمة</strong>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={8} md={6}>
            <Tab.Content>
              <Tab.Pane eventKey='previous'>
                <MatchCard match={data?.previous[0]} />
              </Tab.Pane>
              <Tab.Pane eventKey='today'>
                <MatchCard match={data?.today[0]} />
              </Tab.Pane>
              <Tab.Pane eventKey='next'>
                <MatchCard match={data?.next[0]} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

TeamCalendar.propTypes = {
  team_id: PropTypes.string,
};

export default withOnDemandAndErrorBoundary(TeamCalendar);

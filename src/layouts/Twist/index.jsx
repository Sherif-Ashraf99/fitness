import { Outlet, useParams, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./index.module.css";
import FitnessHeader from "../Fitness/Header";
import { useEffect } from "react";

function Layout() {
  const { pathname } = useLocation();

  const getPageStaticHeader = () => {
    return <FitnessHeader />;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div
      className={`${styles["main-layout"]} main-layout 
				`}
    >
      {/* <Header isInTwistPages={isInTwistPages} /> */}
      {getPageStaticHeader()}
      <main className={`${pathname === "/" ? styles["home-page"] : ""}`}>
        <Container>
          <Outlet />
        </Container>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;

import { Children, useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguagesDropdown from "src/components/Twist/Dropdown/Languages";
import IconToggle from "src/components/Twist/IconToggle";
import TheHeaderSearch from "src/components/Twist/Modals/TheHeaderSearch";
import homeIcon from "src/assets/images/Twist/home-icon.svg";
import newsIcon from "src/assets/images/Twist/news-icon.svg";
import videosIcon from "src/assets/images/Twist/videos-icon.svg";
import tournamentsIcon from "src/assets/images/Twist/tournaments-icon.png";
import matchesIcon from "src/assets/images/Twist/matches-icon.png";
import othersportsIcon from "src/assets/images/Twist/othersports-icon.png";
import alahlyIcon from "src/assets/images/Twist/ahlyLogo.png";
import meloukIcon from "src/assets/images/Twist/melouk-logo.png";
import vsLogoIcon from "src/assets/images/Twist/vs-logo.png";
import ellipseIcon from "src/assets/images/Twist/ellipse-icon.svg";
import openMenuIcon from "src/assets/images/Twist/open-menu-icon.svg";
import closeMenuIcon from "src/assets/images/Twist/close-menu-icon.svg";
import twistHeaderLogo from "src/assets/images/Twist/twist-header-logo.svg";
import { FaUserAlt } from "react-icons/fa";
import searchIcon from "src/assets/images/Twist/search-icon.svg";
import leftArrowIcon from "src/assets/images/Twist/left-arrow-icon.svg";
import styles from "./index.module.css";
import fitnessIcon from "src/assets/images/Fitness/fitnessLogo.png";
import { useQueries } from "@tanstack/react-query";
import apis from "src/services/Twist";
import basketball from "src/assets/images/Twist/basketball-icon.png";
import {
  ImgURL,
  getRouteInfo,
  getServiceAndSportRoute,
} from "src/utils/globalFn";
import { sharedComponentsContext } from "src/context/shared-context";
import gamesNavIcon from "src/assets/images/Twist/gamesNavIcon.png";
import { AiOutlineConsoleSql } from "react-icons/ai";
import Cookies from "universal-cookie";
import Notifications from "./Notifications";

const navLinks = [
  { name: "home", path: "/", logo: homeIcon },
  { name: "الكرة العالمية", path: "/international", logo: ellipseIcon },
  { name: "الكرة المحلية", path: "/local", logo: ellipseIcon },
  { name: "الكرة الإفريقية", path: "/africa", logo: ellipseIcon },
  { name: "matches", path: "/matches", logo: matchesIcon },
  { name: "ملوك الكورة", path: "/melouk-elkora", logo: meloukIcon },
  {
    name: "al-ahly",
    path: "/al-ahly/local/team/6631/overview",
    logo: alahlyIcon,
  },
  { name: "fitness", path: "/fitness", logo: fitnessIcon },
  { name: "الرياضات الأخرى", path: "/othersports", logo: basketball },
  { name: "موسم الانتقالات", path: "/transfer-season", logo: null },
];

const contentNews = [
  { name: "home", path: "/", logo: homeIcon },
  { name: "news", path: "/news", logo: newsIcon },
  { name: "videos", path: "/videos", logo: videosIcon },
  { name: "matches", path: "/matches", logo: matchesIcon },
  { name: "tournaments", path: "/tournaments", logo: tournamentsIcon },
  { name: "الرياضات الأخرى", path: "/othersports", logo: basketball },
];

const topNavLinks = [
  {
    name: "النادي الأهلي",
    path: "/al-ahly/local/team/6631/overview",
    logo: alahlyIcon,
  },
  { name: "تويست فيتنس", path: "/fitness", logo: fitnessIcon },
  { name: "ملوك الكورة", path: "/melouk-elkora", logo: meloukIcon },
  // { name: 'مقارنات', path: '/comparisons', logo: vsLogoIcon },
  { name: "الالعاب", path: "/twist-games", logo: gamesNavIcon },
];

const sectionsNavLinks = [
  { name: "الكرة المحلية", path: "/local", logo: ellipseIcon },
  { name: "الكرة العالمية", path: "/international", logo: ellipseIcon },
  { name: "الكرة الإفريقية", path: "/africa", logo: ellipseIcon },
  { name: "الرياضات الأخرى", path: "/othersports", logo: ellipseIcon },
  { name: "موسم الانتقالات", path: "/transfer-season", logo: ellipseIcon },
];

const apiFn = (sportId, params) => {
  return sportId === 7
    ? apis.squash.getTournaments()
    : apis.tournaments.getTournaments(params);
};

const customizedSquashDataFn = (data) => {
  const customizedSquashData = [...data].map((tournament) => {
    return {
      ...tournament,
      services: [10],
      sport_id: 7,
      title: tournament.name_ar,
    };
  });
  return customizedSquashData;
};

function TheHeader({ isInTwistPages }) {
  const { t, ready } = useTranslation();
  const { pathname } = useLocation();
  const [showPlayerSearchModal, setShowPlayerSearchModal] = useState(false);
  const [showHeaderNavLinks, setShowHeaderNavLinks] = useState(false);
  const { serviceId: service_id, sportId: sport_id } = getRouteInfo(pathname);
  const {
    seasonInfo: { appActiveSeason },
  } = useContext(sharedComponentsContext);

  const competition_type = [2, 1];

  const allData = useQueries({
    queries: competition_type.map((key) => {
      return {
        queryKey: [
          "League && Tournaments",
          key,
          service_id,
          sport_id,
          appActiveSeason.id,
        ],
        queryFn: () =>
          apiFn(sport_id, {
            sport_id,
            service_id,
            competition_type: key,
            season_id: appActiveSeason.id,
            priority: 1,
          }),
        select: (data) =>
          sport_id === 7 ? customizedSquashDataFn(data?.data) : data,
        enabled: !!appActiveSeason.id,
      };
    }),
  });

  const handleToggleHeaderNavLinks = () => {
    showPlayerSearchModal && setShowPlayerSearchModal(false);
    setShowHeaderNavLinks((prev) => !prev);
  };

  const handleTogglePlayerSearchModal = () => {
    showHeaderNavLinks && setShowHeaderNavLinks(false);
    setShowPlayerSearchModal((prev) => !prev);
  };

  // scrolling logic
  const [navBarClass, setNavBarClass] = useState(false);
  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const scrollEvent = window.addEventListener("scroll", () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos && prevScrollPos > 100) {
        // user has scrolled up
        setNavBarClass(true);
      } else {
        // user has scrolled down
        setNavBarClass(false);
      }

      prevScrollPos = currentScrollPos;
    });

    return () => {
      removeEventListener("scroll", scrollEvent);
    };
  }, [window.scrollY]);

  const [isLogin, SetIsLogin] = useState(false);
  const cookie = new Cookies();
  const userPhoneNumber =
    cookie.get("international")?.split(",")[1] ||
    cookie.get("local")?.split(",")[1] ||
    cookie.get("africa")?.split(",")[1] ||
    cookie.get("meloukelkora")?.split(",")[1] ||
    cookie.get("othersports")?.split(",")[1];

  useEffect(() => {
    return; /* Temporarily disable user page link */
    if (userPhoneNumber) {
      SetIsLogin(true);
    } else {
      SetIsLogin(false);
    }
  }, [cookie]);

  const renderNavLinks = (
    NavLinks,
    isImage,
    width,
    height,
    isLocalImage,
    isTournamentInsideSideMenu
  ) => {
    {
      return Children.toArray(
        NavLinks?.map(
          ({ name, path, logo, title, service_id, sport_id, id }) => {
            return (
              <Nav.Link
                as={NavLink}
                to={
                  path ??
                  `${getServiceAndSportRoute(
                    service_id,
                    sport_id
                  )}tournament/${id}/overview`
                }
                className={`${styles["header-navlink"]}`}
                onClick={() => setShowHeaderNavLinks(false)}
              >
                {isImage && (
                  <>
                    {isTournamentInsideSideMenu ? (
                      <div
                        className={`${styles["white-radius"]}`}
                        style={{ width: width, height: height }}
                      >
                        <img
                          loading="lazy"
                          src={`${isLocalImage ? logo : ImgURL(logo)}`}
                          alt={`${title}`}
                        />
                      </div>
                    ) : (
                      <img
                        loading="lazy"
                        src={`${isLocalImage ? logo : ImgURL(logo)}`}
                        width={width}
                        height={height}
                        alt={`${title}`}
                      />
                    )}
                  </>
                )}
                {name || title ? <span>{t(`${name || title}`)}</span> : ""}
              </Nav.Link>
            );
          }
        )
      );
    }
  };

  return (
    <header
      className={`${styles["default-header"]} 
      ${false && styles["scroll-toggle"]} 
      ${showHeaderNavLinks && styles["opend-header-nav"]}`}
    >
      <Navbar>
        <Container>
          <div
            className={`${styles["header-navlinks-toggle-icon"]}`}
            onClick={handleToggleHeaderNavLinks}
          >
            <IconToggle
              boolean={showHeaderNavLinks}
              falseIcon={{ src: openMenuIcon, width: 25, height: 25 }}
              trueIcon={{ src: closeMenuIcon, width: 20, height: 20 }}
            />
          </div>
          <Navbar.Brand
            as={NavLink}
            to=""
            onClick={() =>
              pathname === "/" ? (window.location.href = "/") : null
            }
          >
            <img
              loading="lazy"
              src={twistHeaderLogo}
              width={80}
              height={50}
              alt=""
            />
          </Navbar.Brand>
          {!showHeaderNavLinks && (
            <Nav className={`${styles["header-nav"]}`} defaultActiveKey="/">
              {ready && renderNavLinks(navLinks, false, 18, 18)}
            </Nav>
          )}
          <Modal
            backdropClassName={`header-navlinks-modal-backdrop ${
              !isInTwistPages && "not-twist-pages"
            }`}
            className={`${
              styles["header-navlinks-modal"]
            } header-navlinks-modal ${!isInTwistPages && "not-twist-pages"}`}
            show={showHeaderNavLinks}
            fullscreen={true}
          >
            <Container className={`${styles["header-navlinks-container"]}`}>
              <Modal.Header className={`my-2`}>
                {isLogin && (
                  <div className={`${styles["modal-header-user-info"]}`}>
                    <NavLink
                      to={"/user"}
                      className={`${styles["user-mob"]}`}
                      onClick={() => setShowHeaderNavLinks(false)}
                    >
                      <div className={`${styles["userIcon"]}`}>
                        <FaUserAlt size={40} />
                      </div>
                    </NavLink>
                    <span>{userPhoneNumber}</span>
                  </div>
                )}
              </Modal.Header>
              <Modal.Body className={`${styles["header-navlinks-modal-body"]}`}>
                <Nav className={`${styles["header-top-navlinks-parent"]}`}>
                  {renderNavLinks(topNavLinks, true, 40, 40, true)}
                </Nav>
                <div className={`${styles["content-news-wrapper"]}`}>
                  <h4>محتوى إخباري</h4>
                  <Nav
                    className={`${styles["header-section-navlinks-parent"]}`}
                  >
                    {renderNavLinks(contentNews, true, 35, 35, true)}
                  </Nav>
                </div>
                {allData[0]?.data?.length !== 0 && (
                  <div className={`${styles["tournaments-wrapper"]}`}>
                    <h4>دوريات</h4>
                    <Nav
                      className={`${styles["header-section-navlinks-parent"]}`}
                    >
                      {renderNavLinks(
                        allData[0]?.data?.slice(0, 7),
                        true,
                        35,
                        35,
                        undefined,
                        true
                      )}
                    </Nav>
                  </div>
                )}
                <div className={`${styles["tournaments-wrapper"]}`}>
                  <h4>بطولات</h4>
                  <Nav
                    className={`${styles["header-section-navlinks-parent"]}`}
                  >
                    {renderNavLinks(
                      allData[1]?.data?.slice(0, 11),
                      true,
                      35,
                      35,
                      undefined,
                      true
                    )}
                    <Nav.Link
                      as={NavLink}
                      to={`${getServiceAndSportRoute(
                        service_id,
                        sport_id
                      )}tournaments`}
                      className={`${styles["header-navlink"]} ${styles["all-tournaments"]}`}
                      onClick={() => setShowHeaderNavLinks(false)}
                    >
                      <span className="ps-3">كل البطولات</span>
                      <img
                        loading="lazy"
                        src={leftArrowIcon}
                        width={20}
                        height={20}
                        alt=""
                      />
                    </Nav.Link>
                  </Nav>
                </div>
                <div className={`${styles["sections-wrapper"]}`}>
                  <h4>أقسام</h4>
                  <Nav
                    className={`${styles["header-section-navlinks-parent"]}`}
                  >
                    {renderNavLinks(sectionsNavLinks, true, 15, 15, true)}
                  </Nav>
                </div>
              </Modal.Body>
            </Container>
          </Modal>
          {!!ready && !showHeaderNavLinks && (
            <div className={styles["header-notifications-container"]}>
              <Notifications />
            </div>
          )}
          <div
            className={`${styles["lang-search-wrapper"]} ${
              showHeaderNavLinks ? `${styles["show"]}` : ""
            }`}
          >
            {/* <LanguagesDropdown /> */}

            {isLogin && (
              <NavLink
                to={"/user"}
                className={`${styles["user-web"]}`}
                onClick={() => setShowHeaderNavLinks(false)}
              >
                <div className={`${styles["userIcon"]}`}>
                  <FaUserAlt size={20} />
                </div>
              </NavLink>
            )}
            <div className={`${styles["player-search"]}`}>
              <span onClick={handleTogglePlayerSearchModal}>
                <IconToggle
                  boolean={showPlayerSearchModal}
                  falseIcon={{ src: searchIcon }}
                  trueIcon={{ src: closeMenuIcon }}
                />
              </span>
              <TheHeaderSearch
                showPlayerSearchModal={showPlayerSearchModal}
                setShowPlayerSearchModal={setShowPlayerSearchModal}
              />
            </div>
          </div>
        </Container>
      </Navbar>
    </header>
  );
}

export default TheHeader;

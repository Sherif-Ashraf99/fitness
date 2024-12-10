import styles from "./index.module.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import fitnessLogo from "src/assets/images/Fitness/fitnessLogo.png";
import { useLocation } from "react-router-dom";

const navLinks = [
  { title: "الرئيسية", path: "/", name: "/" },
  {
    title: "تمرينات في الجيم",
    path: "/fitness/gym-workout",
    name: "gym-workout",
  },
  {
    title: "تمرينات في المنزل",
    path: "/fitness/home-workout",
    name: "home-workout",
  },
  { title: "اسأل علي مظهر", path: "fitness/ask-mazhar/question", name: "ask" },
  // { title: 'نصائح علي مظهر', path: 'fitness/ali-tips', name: 'ali-tips' },
  // { title: 'مفضلتي', path: 'fitness/favorites', name: 'favorites' },
  // { title: 'تمارين خاصة', path: 'fitness/personal-workout', name: 'personal-workout' },
  // { title: 'تغذية خاصة', path: 'fitness/personal-nutrition', name: 'personal-nutrition' },
  // { title: 'تمارين العضلات', path: 'fitness/muscles-workout', name: 'muscles-workout' },
];

const FitnessHeader = () => {
  const { pathname } = useLocation();
  const currentRoute = pathname.split("/").at(-1);
  return (
    <Navbar className={`${styles["navbar"]}`}>
      <Container className="justify-content-lg-center">
        <Nav className={`${styles["nav"]}`}>
          <Nav.Link as={NavLink} to={`/`}>
            <img src={fitnessLogo} width={40} alt="Fitness" className="ms-5" />
          </Nav.Link>

          {navLinks.map(({ title, path, name }, i) => (
            <Nav.Link
              key={name}
              as={NavLink}
              to={path}
              className={`${styles["navlink"]}   ${
                currentRoute.includes(name) && styles["current-active-tab"]
              } ${
                i === 5 &&
                pathname.includes("ask") &&
                styles["current-active-tab"]
              }`}
            >
              <span className="text-nowrap">{`${title}`}</span>
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default FitnessHeader;

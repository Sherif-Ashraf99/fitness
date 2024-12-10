import styles from "./index.module.css";
import { NavLink } from "react-router-dom";
import handballIcon from "src/assets/images/Twist/handball-icon.png";
import basketballIcon from "src/assets/images/Twist/basketball-icon.png";
import tennisIcon from "src/assets/images/Twist/tennis-icon.png";
import squashIcon from "src/assets/images/Twist/squash-icon.png";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function OtherSportsLinks() {
  const othersportsInfo = [
    { path: "othersports/handball", icon: handballIcon },
    { path: "othersports/basketball", icon: basketballIcon },
    { path: "othersports/tennis", icon: tennisIcon },
    { path: "othersports/squash", icon: squashIcon },
  ];

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

  return (
    <div
      className={`${styles["othersports-links"]} 
        ${navBarClass && styles["scroll-toggle"]}
    `}>
      <Container className='py-3'>
        <ul>
          {othersportsInfo.map(({ path, icon }) => (
            <li key={path}>
              <NavLink to={path}>
                <img src={icon} alt='' />
              </NavLink>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default OtherSportsLinks;

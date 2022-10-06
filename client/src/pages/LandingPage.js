import React from "react";
import logo from "../images/logo.png";
import search from "../images/Google Web Search (darker).png";
import styles from "./LandingPage.module.css";
import pencil from "../images/pencil.png";
import maleUser from "../images/Male User.png";
import Button from "@mui/material/Button";
import MainList from "./MainList";

const LandingPage = () => {
  return (
    <section>
      <section className={styles.headerContainer}>
        <img src={logo} alt="logo" draggable="false" className={styles.logo} />
        {/* <button className={styles.categoryBth}>Category</button> */}
        <Button variant="text" style={{ color: "#6C5D53" }}>
          Category
        </Button>

        <form action="submit" className={styles.searchBar}>
          <input type="text" placeholder="Search bar" className={styles.bar} />
          <div className={styles.imageWrapper}>
            <img src={search} className={styles.searchBth} alt="search" />
          </div>
        </form>

        <img src={pencil} className={styles.interface} alt="pencil" />
        <img src={maleUser} className={styles.interface} alt="maleUser" />
      </section>

      <div>
        <MainList />
      </div>
    </section>
  );
};

export default LandingPage;

import React from "react";
import logo from "../images/logo.png";
import search from "../images/Google Web Search.png";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <section className={styles.headerContainer}>
      <img src={logo} alt="logo" className={styles.logo} />
      <button className={styles.primaryBth}>Category</button>

      <form action="submit" className={styles.searchBar}>
        <input type="text" placeholder="Search bar" className={styles.bar} />
        <img src={search} alt="search" />
      </form>
    </section>
  );
};

export default LandingPage;

import React from 'react'
import logo from "./pictures/Logo.png";
import search from "./pictures/Google Web Search.png"
import styles from "./LandingPage.module.css";


const LandingPage = () => {
  return (
    <section className={styles.header_container}>
      <img src={logo} alt="logo" className={styles.logo}/>
      <button className={styles.primarybth}>Category</button>

      <form action="submit" className={styles.search_bar}>
        <input type="text" placeholder='Search bar' className={styles.bar} />
        <img src={search} alt="search" />
      </form>
    </section>

  )
}

export default LandingPage
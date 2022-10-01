import React from 'react'
import logo from "./pictures/Logo.png";
import search from "./pictures/Google Web Search.png"
import pencil from "./pictures/Pencil.png"
import maleUser from "./pictures/Male User.png"
import styles from "./LandingPage.module.css";


const LandingPage = () => {
  return (
    <section className={styles.header_container}>
      <img src={logo} alt="logo"/>

      <button className={styles.primarybth}>Category</button>

      <form action="submit" className={styles.search_bar}>
        <input type="text" placeholder='Search bar' className={styles.bar} />
        <img src={search} alt="search" className={styles.search_image} />
      </form>

    <div className={styles.interface}>
      <img src={pencil} alt="" className={styles.pencil} />
      <img src={maleUser} alt="" className={styles.user}/>
    </div>
    </section>

  )
}

export default LandingPage
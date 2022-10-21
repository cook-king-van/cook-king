import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <>
      <div className={styles.spinnerBeanEater}>
        <div className={styles.innerSpinner}>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <p>Loading . . .</p>
    </>
  );
};

export default Spinner;

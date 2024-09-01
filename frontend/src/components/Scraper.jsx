import Navbar from './Navbar';
import styles from './Scraper.module.css';
import React from 'react';

const Scraper = () => {
  	return (
    		<div className={styles.scraper}>
                <Navbar />
                <div className={styles.crimewatch}>crimewatch</div>
      			<div className={styles.whichWebsiteWould}>which website would you like to check?</div>
                <div className={styles.keywords}>keywords</div>
            </div>
        );
};
      			
export default Scraper;
      			
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <div className={styles.home} onClick={() => navigate('/main')}>home</div>
      <div className={styles.scraperWebsite} onClick= {() => navigate('/scraper')}>
        <p className={styles.scraper}>scraper/</p>
        <p className={styles.scraper}>website</p>
      </div>
      <div className={styles.photo} onClick= {() => navigate('/photo')}>photo</div>
      <div className={styles.audio} onClick={() => navigate('/audio')}>audio</div>
      <div className={styles.settings} onClick={() => navigate('/logout')}>logout</div>
    </div>
  );
};

export default Navbar;


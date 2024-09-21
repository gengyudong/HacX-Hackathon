import styles from './Photo.module.css';
import Navbar from './Navbar';
import ImageDescription from './OpenAI';
import React from 'react';

const Photo = () => {
	return (
		<div className={styles.photo}>
		  <Navbar />
		  <div className={styles.crimewatch}>crimewatch</div>
		  <div className={styles.test}>
		  <ImageDescription />
		</div>
		</div>
	);
  };

export default Photo;
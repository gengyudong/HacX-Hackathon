import styles from './Main.module.css';
import Navbar from './Navbar';

const Main = () => {  	
  	return (
    		<div className={styles.main}>
				<Navbar />
				<div className={styles.crimewatch}>crimewatch</div>
      			<div className={styles.welcomeBackVigilante101Container}>
        				<p className={styles.scraper}>{`welcome back, vigilante101! `}</p>
        				<p className={styles.scraper}>what shall we check today?</p>
          		</div>
          		</div>);
};
        				
export default Main;
        				